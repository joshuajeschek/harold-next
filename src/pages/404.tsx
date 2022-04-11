import Image from 'react-bootstrap/Image';
import { Button, Stack } from 'react-bootstrap';
import { NextSeo } from 'next-seo';
import { robotBlockingPageProps } from '../utils/constants';

export default function Custom404() {
    return (
        <>
            <NextSeo
                title='404'
                nofollow
                noindex
                robotsProps={robotBlockingPageProps}
            />

            <Stack gap={2} className='align-items-center content'>
                <Image
                    src='https://http.cat/404'
                    alt='404 - Page Not Found'
                    width={750}
                    height={600}
                ></Image>
                <Button style={{ width: '18rem' }} href='/'>
                    return to home
                </Button>
            </Stack>
        </>
    );
}
