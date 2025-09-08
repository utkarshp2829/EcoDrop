export interface ApiConfig {
	baseUrl: string;
}

const DEFAULT_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export const apiFetch = async (path: string, init?: RequestInit) => {
	const res = await fetch(`${DEFAULT_BASE_URL}${path}`, {
		...init,
		headers: {
			'Content-Type': 'application/json',
			...(init?.headers || {})
		}
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || `Request failed: ${res.status}`);
	}
	return res.json();
};

export const upsertUser = (payload: { uid: string; email: string; displayName?: string }) => {
	return apiFetch('/api/users', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
};

export const getUserPoints = (uid: string): Promise<{ points: number }> => {
	return apiFetch(`/api/users/${uid}/points`);
};

export const updateUserPoints = (uid: string, payload: { delta?: number; set?: number }): Promise<{ points: number }> => {
	return apiFetch(`/api/users/${uid}/points`, {
		method: 'PATCH',
		body: JSON.stringify(payload)
	});
};

 
