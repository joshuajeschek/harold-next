import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import {
    BASE_WEB_URL,
    DISCORD_APP_ID,
	LocalStorageKeys,
} from '../../../utils/constants';
import type { RESTGetAPICurrentUserResult } from 'discord-api-types/v9';
import { apiFetch } from '../../../utils/api';


export interface OauthDiscordCallbackProps {
    user?: RESTGetAPICurrentUserResult;
}

const OauthDiscordCallback: NextPage<OauthDiscordCallbackProps> = ({ user }) => {
    const { push } = useRouter();

	useEffect(() => {
		if (!user) {
			push('/oauth/auth-failed');
			return;
		}
		localStorage.setItem(LocalStorageKeys.DiscordId, user.id);
	});

    return (
        <>
            <Head>
                <title>Authentication</title>
                <meta
                    name="description"
                    content="Connect your Discord Account with CS:GO"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
			<Container className="text-center content">
				{
					user ? <>
						<h4>Hello, {user.username}#{user.discriminator}!</h4>
						<h6>You will be redirected to be authenticated with steam.</h6>
					</> : <>
						<h6>An error occured!</h6>
					</>
				}
            </Container>
        </>
    );
};

export async function getServerSideProps(ctx): Promise<{ props: OauthDiscordCallbackProps }> {
	if (!ctx.query.code)
		return { props: { user: null } };
	try {
		const data = await apiFetch<OauthDiscordCallbackProps>(`/oauth/callback`, {
			method: 'POST',
			body: JSON.stringify({
				code: ctx.query.code,
				clientId: DISCORD_APP_ID,
				redirectUri: `${BASE_WEB_URL}/oauth/discord/callback`
			})
		});
		return { props: data };
	} catch (error) {
		return { props: { user: null } };
	}
};

export default OauthDiscordCallback;
