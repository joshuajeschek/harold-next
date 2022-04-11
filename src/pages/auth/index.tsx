import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import SteamAuth from 'node-steam-openid';
import { BASE_WEB_URL, DISCORD_APP_ID, oauthURL, robotBlockingPageProps, STEAM_API_KEY } from '../../utils/constants';
import * as API from '../../utils/api';
import { NextSeo } from 'next-seo';

interface AuthIndexProps {
    redirect: string | null;
}

const AuthIndex: NextPage<AuthIndexProps> = ({ redirect }) => {

    const { push } = useRouter();

    useEffect(() => {
        if (redirect)
            push(redirect);
        else
            push('/auth/auth-failed');
    });
    return (
        <>
            <NextSeo title='Auth' nofollow noindex robotsProps={robotBlockingPageProps} />
            <Container className='text-center content'>
                <h4>You will be redirected to authenticate with Discord...</h4>
            </Container>
        </>
    );
}

export async function getServerSideProps(ctx): Promise<{ props: AuthIndexProps }> {

    const code = ctx.query.code;
    const error = ctx.query.error;
    if (error)
        return { props: { redirect: '/auth/failed' } };
    if (!code)
        return { props: { redirect: oauthURL.toString() } };

    try {
        // get user data from bot api
        const data = await API.post('/oauth/callback', {
            code,
            clientId: DISCORD_APP_ID,
            redirectUri: `${BASE_WEB_URL}/auth`
        })
        // const data = await apiFetch<{user: RESTGetAPICurrentUserResult}>(`/oauth/callback`, {
        //     method: 'POST',
		// 	body: JSON.stringify({
        //         code,
		// 		clientId: DISCORD_APP_ID,
		// 		redirectUri: `${BASE_WEB_URL}/auth`
		// 	})
        // });
        if (!data) return { props: { redirect: '/auth/failed' } };

        // get authId from bot api
        const { authId } = await API.get('/auth', { discordId: data.user.id });
        if (!authId) return { props: { redirect: '/auth/unavailable' } };

        // put authId from bot api into steamAuth
        const redirectUrl = await new SteamAuth({
            realm: BASE_WEB_URL,
            returnUrl: `${BASE_WEB_URL}/auth/${authId}`,
            apiKey: STEAM_API_KEY
        }).getRedirectUrl();

        return { props: { redirect: redirectUrl || '/auth/unavailable' } };
    } catch (error) {
        return { props: { redirect: '/auth/unavailable' } };
    }
};


export default AuthIndex;
