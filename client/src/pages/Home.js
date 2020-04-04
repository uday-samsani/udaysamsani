import React from 'react';

import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HomeIllustration from '../images/Blogging.gif';

const useStyles = makeStyles(theme => ({
	root: {
		padding: '2em 0'
	},
	title: {
		fontWeight: 'bold'
	},
	text: {
		padding: ' 1em 2em',
		textAlign: 'center'
	}
}));

const Home = props => {
	const classes = useStyles();
	const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
	return (
		<div className={classes.root}>
			<Grid
				container
				wrap='wrap'
				cols={2}
				alignItems='center'
				justifyItems='space-evenly'
			>
				<Grid item>
					<img
						src={HomeIllustration}
						alt={'Coding Illustration'}
						width={isMobile ? '350px' : '600px'}
					/>
				</Grid>
				<Grid item>
					<div className={classes.text}>
						<Typography variant='h4' className={classes.title}>
							{'Coffee + Code'}
						</Typography>
						<Typography variant='h5'>
							A way to deal JavaScript.
						</Typography>
						<Typography variant='h6'>
							Been developing web applications since 2 years.
						</Typography>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default Home;
