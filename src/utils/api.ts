import { BASE_API_URL } from "./constants";

interface ApiAuthResponse {
    authId?: string;
    discordAvatar?: string;
    exists: boolean;
}


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

export async function get(path: '/auth', params: Record<string, string>): Promise<ApiAuthResponse>
export async function get(path: string, params: Record<string, string>): Promise<any> {
    path = `${BASE_API_URL}${path}?${new URLSearchParams(params).toString()}`;
    return fetch(path, { method: 'GET' }).then(response => response.json());
}
