import Head from 'next/head';
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';

export default function Auth() {
    // useEffect(() => window.location.replace('https://www.google.com'));
    return (
        <>
            <Head>
                <title>Authentication</title>
                <meta
                    name="description"
                    content="Connect your Discord Account with CS:GO"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container className="text-center content">
                <h4>You will be redirected to authenticate with Discord.</h4>
            </Container>
        </>
    );
}
