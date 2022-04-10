import { NextPage } from 'next';
import { useRouter } from 'next/router';
import SteamAuth from 'node-steam-openid';
import { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { get } from '../../utils/api';
import { BASE_WEB_URL, STEAM_API_KEY } from '../../utils/constants';

interface AuthProps {
    redirect?: string;
    steamAvatar?: string;
    discordAvatar?: string;
}

const Auth: NextPage<AuthProps> = ({ redirect, steamAvatar, discordAvatar }) => {
    const { push } = useRouter();
    useEffect(() => {
        if (redirect)
            push(redirect);
    });
    return <Container className="text-center content">
        <h1>placeholder</h1>
        <Image src={steamAvatar} alt='steam avatar'/>
        <Image src={discordAvatar} alt='discord avatar'/>
    </Container>
}

export async function getServerSideProps(ctx): Promise<{ props: AuthProps }> {
    const authId = ctx.query.authId;
    if (!authId)
        return { props: { redirect: '/auth' } };
    try {

        const { exists } = await get('/auth', { authId });
        if (!exists) {
            console.log('doesnt exist');
            return { props: { redirect: '/auth' } };
        }

        const user = await new SteamAuth({
            realm: BASE_WEB_URL,
            returnUrl: `${BASE_WEB_URL}/auth/${authId}`,
            apiKey: STEAM_API_KEY
        }).authenticate(ctx.req);

        // get discord avatar from bot api and write steam id
        const { discordAvatar } = await get('/auth', { authId, steamId: user.steamid });

        if (!discordAvatar)
            return { props: { redirect: '/auth/failed' } }

        return { props: { steamAvatar: user.avatar.large || '/steam.svg', discordAvatar } };
    } catch (error) {
        console.log(error);
        return { props: { redirect: '/auth/failed' } };
    }
}

export default Auth;
