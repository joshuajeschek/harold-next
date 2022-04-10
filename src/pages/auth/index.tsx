import { RESTGetAPICurrentUserResult } from 'discord-api-types/v10';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { apiFetch, get } from '../../utils/api';
import { BASE_WEB_URL, DISCORD_APP_ID, oauthURL, STEAM_API_KEY } from '../../utils/constants';
import SteamAuth from 'node-steam-openid';

interface AuthIndexProps {
    redirectUrl: string | null;
}

const AuthIndex: NextPage<AuthIndexProps> = ({ redirectUrl }) => {

    const { push } = useRouter();

    useEffect(() => {
        if (redirectUrl)
            push(redirectUrl);
        else
            push('/auth/auth-failed');
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
                <h4>You will be redirected to authenticate with Discord...</h4>
            </Container>
        </>
    );
}

export async function getServerSideProps(ctx): Promise<{ props: AuthIndexProps }> {

    const code = ctx.query.code;
    if (!code)
        return { props: { redirectUrl: oauthURL.toString() } };

    try {
        // get user data from bot api
        const data = await apiFetch<{user: RESTGetAPICurrentUserResult}>(`/oauth/callback`, {
            method: 'POST',
			body: JSON.stringify({
                code,
				clientId: DISCORD_APP_ID,
				redirectUri: `${BASE_WEB_URL}/auth`
			})
        });
        if (!data) throw new Error('No user data returned');

        // get authId from bot api
        const res = await get('/auth', { discordId: data.user.id });
        console.log(res);
        if (!res.authId) throw new Error('No auth id returned');

        // put authId from bot api into steamAuth
        const redirectUrl = await new SteamAuth({
            realm: BASE_WEB_URL,
            returnUrl: `${BASE_WEB_URL}/auth/${res.authId}`,
            apiKey: STEAM_API_KEY
        }).getRedirectUrl();

        return { props: { redirectUrl: redirectUrl || null } };
    } catch (error) {
        console.log(error);
        return { props: { redirectUrl: null } };
    }
};


export default AuthIndex;
