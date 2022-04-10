import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import '../scss/globals.scss';
import Image from 'react-bootstrap/Image';
import { oauthURL } from '../utils/constants';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Navbar variant="dark" bg="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <Image src='/logo.svg' alt='Harold Logo' height={30}/>{' '}
                        Bot Harold
                    </Navbar.Brand>
                    <Nav className="container-fluid">
                        <Nav.Link href="/docs">Documentation</Nav.Link>
                        <Nav.Link href='/auth'>Authentication</Nav.Link>
                        <Nav.Link className='ms-auto' href="https://www.github.com/joshuajeschek/harold" target='_blank'>
							<Image src='/github.svg' alt='Github Logo' height={20} />{' '}
							joshuajeschek/harold
                    </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
