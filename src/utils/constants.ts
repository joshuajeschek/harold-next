import SteamAuth from 'node-steam-openid';

export const DISCORD_APP_ID = process.env.NEXT_PUBLIC_DISCORD_APP_ID;
export const BASE_WEB_URL = process.env.NEXT_PUBLIC_BASE_WEB_URL;
export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const STEAM_API_KEY = process.env.STEAM_API_KEY;

const DiscordOauthURL = `https://discord.com/oauth2/authorize`;

export const oauthURL = new URL(DiscordOauthURL);
oauthURL.search = new URLSearchParams([
	['redirect_uri', `${BASE_WEB_URL}/auth`],
	['response_type', 'code'],
	['scope', 'identify'],
	['client_id', DISCORD_APP_ID]
]).toString();

export enum LocalStorageKeys {
	DiscordId = 'discord_id',
	DiscordAvatar = 'discord_avatar',
	SteamId = 'steam_id',
	SteamAvatar = 'steam_avatar'
}

let steam;
export const getSteamAuth = () => {
	steam ||= new SteamAuth({
		realm: BASE_WEB_URL,
		returnUrl: `${BASE_WEB_URL}/auth/steam/callback`,
		apiKey: STEAM_API_KEY
	});
	return steam;
}
