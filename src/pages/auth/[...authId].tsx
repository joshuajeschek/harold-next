import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import SteamAuth from 'node-steam-openid';
import * as API from '../../utils/api';
import {
    BASE_WEB_URL,
    robotBlockingPageProps,
    STEAM_API_KEY,
} from '../../utils/constants';
import { NextSeo } from 'next-seo';

interface AuthProps {
    redirect?: string;
    steamAvatar?: string;
    discordAvatar?: string;
}

const Auth: NextPage<AuthProps> = ({
    redirect,
    steamAvatar,
    discordAvatar,
}) => {
    const { push } = useRouter();
    useEffect(() => {
        if (redirect) push(redirect);
    });

    if (!discordAvatar) return AuthLoading;

    return (
        <>
            <NextSeo
                title='Auth Successful'
                nofollow
                noindex
                robotsProps={robotBlockingPageProps}
            />
            <Stack gap={2} className='text-center content'>
                <h1>Authentication successful!</h1>
                <Stack gap={2} direction='horizontal' className='mx-auto'>
                    <Image
                        className='avatar'
                        src={discordAvatar}
                        alt='discord avatar'
                        height={150}
                        width={150}
                    />
                    <table style={{ height: '155px' }}>
                        <tbody>
                            <tr>
                                <td style={{ fontSize: 90 }} className='align-top'>+</td>
                            </tr>
                        </tbody>
                    </table>
                    <Image
                        className='avatar'
                        src={steamAvatar}
                        alt='steam avatar'
                        height={150}
                        width={150}
                    />
                </Stack>
                <h4>You will get a friend request on Steam.</h4>
            </Stack>
        </>
    );
};

const AuthLoading = (
    <>
        <NextSeo
            title='Auth Loading'
            nofollow
            noindex
            robotsProps={robotBlockingPageProps}
        />
        <Container className='text-center content'>
            <h2>Redirecting...</h2>
        </Container>
    </>
);

export async function getServerSideProps(ctx): Promise<{ props: AuthProps }> {
    const authId = ctx.query.authId;
    if (!authId) return { props: { redirect: '/auth' } };

    try {
        // check existence of authId
        const { success } = await API.get('/auth', { authId });
        if (!success) {
            return { props: { redirect: '/auth' } };
        }
    } catch {
        return { props: { redirect: '/auth/unavailable' } };
    }

    const steam = new SteamAuth({
        realm: BASE_WEB_URL,
        returnUrl: `${BASE_WEB_URL}/auth/${authId}`,
        apiKey: STEAM_API_KEY,
    });

    // only authId was supplied
    if (Object.keys(ctx.query).length < 2)
        return { props: { redirect: await steam.getRedirectUrl() } };

    let user;
    try {
        // validate steam user
        user = await steam.authenticate(ctx.req);
    } catch (error) {
        // user validation failed
        return { props: { redirect: '/auth/failed' } };
    }

    try {
        // get discord avatar from bot api and write steam id
        const { discordAvatar } = await API.get('/auth', {
            authId,
            steamId: user.steamid,
        });
        if (!discordAvatar) return { props: { redirect: '/auth/unavailable' } };

        return {
            props: {
                steamAvatar: user.avatar.large || '/steam.svg',
                discordAvatar,
            },
        };
    } catch {
        return { props: { redirect: '/auth/unavailable' } };
    }
}

export default Auth;
