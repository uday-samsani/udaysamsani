import React from 'react';
import { Typography, Container, makeStyles, Grid } from '@material-ui/core';

import udayImage from '../assets/images/profileImage.jpg';

const useStyles = makeStyles(theme => ({
	head: {
		textAlign: 'center',
		padding: '15rem 0'
	},
	about: {
		backgroundColor: '#0375b4',
		padding: '2rem 0',
		textAlign: 'center'
	},
	title: {
		color: '#ffce00',
		fontWeight: 800,
		margin: '1rem 0'
	},
	content: {
		color: '#0e0b16',
		fontSize: '1.5rem',
		padding: '1rem 3rem',
		textAlign: 'center'
	},
	footer: {
		color: '#fff',
		backgroundColor: '#373737',
		fontSize: '1rem',
		padding: '2rem'
	}
}));

const Home = () => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.head}>
				<Typography variant='h1' className={classes.title}>
					<span>Learn</span> <span>Code</span> <span>Enjoy</span>{' '}
					<span>Repeat</span>{' '}
				</Typography>
			</div>
			<div className={classes.about}>
				<Container>
					<Typography variant='h3' className={classes.title}>
						About
					</Typography>
					<Grid container className='aboutSection' spacing={3}>
						<Grid item sm='6'>
							<Typography variant='p' className={classes.content}>
								I am Uday Samsani. I am from vijayawada and I am
								doing my graduation as of now. I love to learn
								new things. I have many hobbies which are
								watching movies, reading books, surfing
								internet, playing games (especially DOTA) and
								listening to music.
							</Typography>
						</Grid>
						<Grid item sm='6'>
							<img
								src={udayImage}
								alt='Uday Samsani'
								width={250}
							/>
						</Grid>
					</Grid>
				</Container>
			</div>
			<div className={classes.footer}>
				<Container>
					<Typography variant={'p'}>
						Copyrights udaysamsani.com, 2019.
					</Typography>
				</Container>
			</div>
		</>
	);
};

export default Home;
