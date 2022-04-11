declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: 'development' | 'production' | 'test';
		readonly NEXT_PUBLIC_DISCORD_APP_ID: string;
		readonly NEXT_PUBLIC_BASE_WEB_URL: string;
		readonly NEXT_PUBLIC_BASE_API_URL: string;
		readonly STEAM_API_KEY: string;
	}
}
