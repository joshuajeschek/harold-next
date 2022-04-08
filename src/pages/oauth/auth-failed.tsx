import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import { Button, Stack } from 'react-bootstrap';
import type { NextPage } from 'next';

const AuthFailed: NextPage = () => {
    return (
        <Stack gap={2} className='align-items-center content'>
            <Image
                src="https://http.cat/503"
                alt="internal server error"
                width={750}
                height={600}
            ></Image>
            <Button style={{width: '18rem'}} href='/'>return to home</Button>
        </Stack>
    );
}

export default AuthFailed;
