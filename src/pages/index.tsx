import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { DISCORD_APP_ID } from '../utils/constants';

const Home: NextPage = () => {
	console.log(DISCORD_APP_ID);
	return (
		<>
			<Head>
				<title>Bot Harold</title>
				<meta
					name="description"
					content="Homepage for Discord and CS:GO Bot Harold"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container className="text-center content">
				<Stack gap={2} className='align-items-center'>
					<Image
						src="/logo.svg"
						alt="Harold logo"
						width={200}
						height={200}
					/>
					<h1>Bot Harold</h1>
					<h4>A Discord Bot that integrates with CS:GO</h4>
					<Button size='lg' variant='success' style={{width: '18rem'}}>
						Get started!
					</Button>
					<Stack direction="horizontal" gap={2} className='mx-auto'>
						<Card style={{ width: '18rem' }} bg='dark'>
							<Card.Img variant="top" src="/commands.png" />
							<Card.Body>
								<Card.Title>Documentation</Card.Title>
								<Card.Text>
									Learn about the bots&apos; capabilities.
								</Card.Text>
								<Button variant="primary" href='/docs'>Read</Button>
							</Card.Body>
						</Card>
						<Card style={{ width: '18rem' }} bg='dark'>
							<Card.Img variant="top" src="/auth.svg" />
							<Card.Body>
								<Card.Title>Authentication</Card.Title>
								<Card.Text>
									Connect your Discord account with your Steam account.
								</Card.Text>
								<Button variant="primary" href='/auth'>Authenticate</Button>
							</Card.Body>
						</Card>
					</Stack>
				</Stack>
			</Container>
		</>
	);
};

export default Home;
