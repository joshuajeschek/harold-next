import Head from 'next/head';
import Container from 'react-bootstrap/Container';

export default function Auth() {
    return (
        <>
            <Head>
                <title>Documentation</title>
                <meta
                    name="description"
                    content="earn about the bots' capabilities."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        <Container className="text-center content">
            <h4>Hello World</h4>
        </Container>
        </>
    );
}
