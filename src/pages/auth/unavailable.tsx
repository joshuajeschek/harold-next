import type { NextPage } from 'next';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { NextSeo } from 'next-seo';
import { robotBlockingPageProps } from '../../utils/constants';

const AuthUnavailable: NextPage = () => {
    return (
        <>
            <NextSeo
                title='Auth Unavailable'
                nofollow
                noindex
                robotsProps={robotBlockingPageProps}
            />
            <Stack gap={2} className='align-items-center content'>
                <h4>
                    Oops, looks like the bot is currently offline, or some other
                    internal error occured. Please try again later.
                </h4>
                <h4>
                    If this problem persists, contact me on discord:{' '}
                    <code>vanitasboi#0252</code>
                </h4>
                <Image
                    src='https://http.cat/503'
                    alt='internal server error'
                    width={500}
                    height={400}
                />
                <Button style={{ width: '18rem' }} href='/'>
                    return to home
                </Button>
            </Stack>
        </>
    );
};

export default AuthUnavailable;
