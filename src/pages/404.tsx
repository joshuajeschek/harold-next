import Image from 'react-bootstrap/Image';
import { Button, Stack } from 'react-bootstrap';

export default function Custom404() {
    return (
        <Stack gap={2} className='align-items-center content'>
            <Image
                src="https://http.cat/404"
                alt="404 - Page Not Found"
                width={750}
                height={600}
            ></Image>
            <Button style={{width: '18rem'}} href='/'>return to home</Button>
        </Stack>
    );
}
