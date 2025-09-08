# EcoDrop - Smart Waste Management

Transform waste into rewards with EcoDrop's innovative recycling platform. Schedule drop-offs, earn points, and make a positive environmental impact.

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

Follow these steps to get the project running locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd eco-drop-ai-rewards

# Step 3: Install the necessary dependencies
npm install

# Step 4: Start the development server
npm run dev
```

## Development

### Backend API (MongoDB)

You can use either Node (Express) or Python (FastAPI).

Node (Express + Mongoose): `server/index.js`
Python (FastAPI + Motor): `server_py/main.py`

Configure environment variables (for local dev you can use a `.env` file at project root):

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/<db>?retryWrites=true&w=majority
MONGODB_DB=ecodrop
PORT=4000
VITE_API_BASE_URL=http://localhost:4000
```

Run API locally in a separate terminal:

```sh
# Node
node server/index.js

# Python
cd server_py
python -m venv .venv
".venv/Scripts/activate"  # Windows PowerShell
pip install -r requirements.txt
uvicorn server_py.main:app --host 0.0.0.0 --port 4000 --reload
```


Endpoints:

- `POST /api/users` → upsert user `{ uid, email, displayName }`
- `GET /api/users/:uid/points` → get points
- `PATCH /api/users/:uid/points` → update points with `{ delta }` or `{ set }`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

### Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## Features

- 🗑️ Smart waste categorization
- 📅 Drop-off scheduling
- 🏆 Rewards and points system
- 📊 Analytics dashboard
- 👥 Volunteer management
- 🔄 Recycling tracking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
