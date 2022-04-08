import { BASE_API_URL } from "./constants";

export async function apiFetch<T>(path: string, options: RequestInit = {}) {
    if (process.env.NODE_ENV === 'development') {
        // await sleep(1000);
    }

    const response = await fetch(`${BASE_API_URL}${path}`, {
        ...options,
        credentials: 'include',
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
        },
    });

    const jsonResponse = await response.json();

    if (jsonResponse.error) {
        throw response;
    } else {
        return jsonResponse as T;
    }
}
