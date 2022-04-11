import { RESTGetAPICurrentUserResult } from 'discord-api-types/v10';
import { BASE_API_URL } from './constants';

interface ApiAuthResponse {
    authId?: string;
    discordAvatar?: string;
    success: boolean;
}

interface ApiOAuthCallbackParams {
    code: string;
    clientId: string;
    redirectUri: string;
}

export async function post(path: '/oauth/callback', params?: ApiOAuthCallbackParams): Promise<{user: RESTGetAPICurrentUserResult}>
export async function post(path: string, params?: Record<string, string> | ApiOAuthCallbackParams): Promise<any> {
    const options: RequestInit = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(params || {}).toString(),
        headers: {'Content-Type': 'application/json'}
    };
    return fetch(`${BASE_API_URL}${path}`, options).then(response => response.json());
}

export async function get(path: '/auth', params?: Record<string, string>): Promise<ApiAuthResponse>
export async function get(path: string, params?: Record<string, string>): Promise<any> {
    path = `${BASE_API_URL}${path}?${new URLSearchParams(params || {}).toString()}`;
    return fetch(path, { method: 'GET' }).then(response => response.json());
}
