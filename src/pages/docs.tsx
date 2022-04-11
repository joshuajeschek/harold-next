import { NextSeo } from 'next-seo';
import Container from 'react-bootstrap/Container';

export default function Auth() {
    return (
        <>
            <NextSeo
                title='Documentation'
                description={'learn about the bot\'s capabilities'}
            />
            <Container className='text-center content'>
                <h4>Hello World</h4>
            </Container>
        </>
    );
}
