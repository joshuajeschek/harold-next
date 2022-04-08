export const DISCORD_APP_ID = process.env.NEXT_PUBLIC_DISCORD_APP_ID;
export const BASE_WEB_URL = process.env.NEXT_PUBLIC_BASE_WEB_URL;
export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const DiscordOauthURL = `https://discord.com/oauth2/authorize`;

export const oauthURL = new URL(DiscordOauthURL);
oauthURL.search = new URLSearchParams([
	['redirect_uri', `${BASE_WEB_URL}/oauth/discord/callback`],
	['response_type', 'code'],
	['scope', 'identify'],
	['client_id', DISCORD_APP_ID]
]).toString();

export enum LocalStorageKeys {
	DiscordId ='discord_id'
}