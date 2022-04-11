import type { NextPage } from 'next';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { NextSeo } from 'next-seo';
import { robotBlockingPageProps } from '../../utils/constants';

const AuthFailed: NextPage = () => {
    return (
        <>
            <NextSeo
                title='Auth Failed'
                nofollow
                noindex
                robotsProps={robotBlockingPageProps}
            />

            <Stack gap={2} className='align-items-center content'>
                <h4>Looks like you cancelled the authorization.</h4>
                <Image
                    src='https://http.cat/401'
                    alt='401 - unauthorized'
                    width={500}
                    height={400}
                />
                <Button href='/auth'>Try again</Button>
            </Stack>
        </>
    );
};

export default AuthFailed;
