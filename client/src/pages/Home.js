import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HomeIllustration from '../images/homeIllustration.png';

const useStyles = makeStyles(theme => ({
	root: {
		padding: '5em 0'
	},
	title: {
		fontWeight: 'bold'
	},
	image: {
		maxWidth: '500px',
		padding: '2em'
	}
}));

const Home = props => {
	const classes = useStyles();
	return (
		<Grid
			container
			wrap='wrap'
			className={classes.root}
			alignItems='center'
			justify='space-evenly'
		>
			<Grid item>
				<img
					src={HomeIllustration}
					alt={'Coding Illustration'}
					className={classes.image}
				/>
			</Grid>
			<Grid item>
				<Typography variant='h4' className={classes.title}>
					{'Coffe + Code'}
				</Typography>
				<Typography variant='h5'>A way to deal JavaScript.</Typography>
				<Typography variant='h6'>
					Been developing web application since 2 years.
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Home;
