import os
from typing import Optional
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pymongo import ReturnDocument
from uuid import uuid4


load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "")
MONGODB_DB = os.getenv("MONGODB_DB", "ecodrop")

mongo_client: Optional[AsyncIOMotorClient] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
	global mongo_client
	if not MONGODB_URI:
		print("Warning: MONGODB_URI is not set. Set it in .env or environment.")
	else:
		mongo_client = AsyncIOMotorClient(MONGODB_URI)
		try:
			# warm up connection
			await mongo_client.admin.command("ping")
		except Exception as e:
			print("MongoDB connection error during startup:", e)
	try:
		yield
	finally:
		if mongo_client:
			mongo_client.close()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


class UpsertUserPayload(BaseModel):
	uid: str = Field(..., min_length=1)
	email: str = Field(..., min_length=3)
	displayName: Optional[str] = None


class UpdatePointsPayload(BaseModel):
	delta: Optional[int] = None
	set: Optional[int] = None


class CreateDropoffPayload(BaseModel):
	uid: str
	categories: dict  # { categoryId: quantity }
	stationId: str
	date: str
	time: str
	station: Optional[dict] = None


class CompleteDropoffPayload(BaseModel):
	totalPoints: int


@app.get("/api/health")
async def health() -> dict:
	return {"ok": True}


@app.post("/api/users")
async def upsert_user(payload: UpsertUserPayload) -> dict:
	if mongo_client is None:
		raise HTTPException(status_code=500, detail="MongoDB not initialized. Set MONGODB_URI.")
	db = mongo_client[MONGODB_DB]
	collection = db["users"]
	update_doc = {
		"$setOnInsert": {"points": 0},
		"$set": {"email": payload.email, "displayName": payload.displayName},
	}
	await collection.update_one({"uid": payload.uid}, update_doc, upsert=True)
	user_doc = await collection.find_one({"uid": payload.uid}, {"_id": 0})
	return {"user": user_doc}


@app.get("/api/users/{uid}/points")
async def get_points(uid: str) -> dict:
	if mongo_client is None:
		raise HTTPException(status_code=500, detail="MongoDB not initialized. Set MONGODB_URI.")
	db = mongo_client[MONGODB_DB]
	collection = db["users"]
	user_doc = await collection.find_one({"uid": uid}, {"_id": 0, "points": 1})
	if not user_doc:
		raise HTTPException(status_code=404, detail="User not found")
	return {"points": int(user_doc.get("points", 0))}


@app.patch("/api/users/{uid}/points")
async def update_points(uid: str, payload: UpdatePointsPayload) -> dict:
	if mongo_client is None:
		raise HTTPException(status_code=500, detail="MongoDB not initialized. Set MONGODB_URI.")
	if payload.delta is None and payload.set is None:
		raise HTTPException(status_code=400, detail="Provide delta or set (number)")

	db = mongo_client[MONGODB_DB]
	collection = db["users"]
	if payload.set is not None:
		res = await collection.find_one_and_update(
			{"uid": uid},
			{"$set": {"points": int(payload.set)}},
			return_document=ReturnDocument.AFTER,
		)
	else:
		res = await collection.find_one_and_update(
			{"uid": uid},
			{"$inc": {"points": int(payload.delta)}},
			return_document=ReturnDocument.AFTER,
		)

	if not res:
		raise HTTPException(status_code=404, detail="User not found")
	return {"points": int(res.get("points", 0))}


# Create drop-off (scheduled)
@app.post("/api/dropoffs")
async def create_dropoff(payload: CreateDropoffPayload) -> dict:
	if mongo_client is None:
		raise HTTPException(status_code=500, detail="MongoDB not initialized. Set MONGODB_URI.")
	db = mongo_client[MONGODB_DB]
	collection = db["dropoffs"]
	dropoff_id = str(uuid4())
	doc = {
		"id": dropoff_id,
		"uid": payload.uid,
		"categories": payload.categories,
		"stationId": payload.stationId,
		"date": payload.date,
		"time": payload.time,
		"station": payload.station,
		"status": "PENDING",
	}
	await collection.insert_one(doc)
	return {"dropoff": {k: v for k, v in doc.items() if k != "_id"}}


# List pending drop-offs
@app.get("/api/dropoffs/pending")
async def list_pending_dropoffs() -> dict:
	if mongo_client is None:
		raise HTTPException(status_code=500, detail="MongoDB not initialized. Set MONGODB_URI.")
	db = mongo_client[MONGODB_DB]
	collection = db["dropoffs"]
	items = []
	async for d in collection.find({"status": "PENDING"}, {"_id": 0}):
		items.append(d)
	return {"dropoffs": items}


# Complete a drop-off and award points
@app.patch("/api/dropoffs/{dropoff_id}/complete")
async def complete_dropoff(dropoff_id: str, payload: CompleteDropoffPayload) -> dict:
	if mongo_client is None:
		raise HTTPException(status_code=500, detail="MongoDB not initialized. Set MONGODB_URI.")
	db = mongo_client[MONGODB_DB]
	dropoffs = db["dropoffs"]
	users = db["users"]

	# Mark dropoff completed
	res = await dropoffs.find_one_and_update(
		{"id": dropoff_id, "status": "PENDING"},
		{"$set": {"status": "COMPLETED", "totalPoints": int(payload.totalPoints)}},
		return_document=ReturnDocument.AFTER,
	)
	if not res:
		raise HTTPException(status_code=404, detail="Dropoff not found or already completed")

	# Award points to user
	user = await users.find_one_and_update(
		{"uid": res["uid"]},
		{"$inc": {"points": int(payload.totalPoints)}},
		return_document=ReturnDocument.AFTER,
	)
	if not user:
		raise HTTPException(status_code=404, detail="User not found")

	return {"dropoff": {k: v for k, v in res.items() if k != "_id"}, "userPoints": int(user.get("points", 0))}


# Run with: uvicorn server_py.main:app --host 0.0.0.0 --port 4000 --reload

