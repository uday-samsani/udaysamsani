import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Grid, Box, useMediaQuery, Typography } from '@material-ui/core';

import { SigninForm } from '../components/Form';
import SigninIllustration from '../images/Signin.gif';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	box: {
		justifyContent: 'space-around',
		alignContent: 'center',
		padding: '2em 0'
	},
	form: {
		textAlign: 'center'
	},
	item: {
		paddingTop: '0.5em'
	},
	link: {
		textDecoration: 'none',
		color: 'inherit',
		opacity: '0.5'
	}
}));

const Login = props => {
	const classes = useStyles();
	const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
	return (
		<Grid
			container
			className={classes.box}
			justify='center'
			alignItems='center'
		>
			{!isMobile ? (
				<Grid item>
					<img src={SigninIllustration} alt='' />
				</Grid>
			) : null}
			<Grid item>
				<Box className={classes.form}>
					<Typography
						variant='h3'
						className={classes.item}
						style={{ fontWeight: '300' }}
					>
						Welcome to the family
					</Typography>
					<SigninForm props={props} />
					<Link
						to='/login'
						className={classNames(classes.link, classes.item)}
					>
						<Typography variant='p'>
							Already have an account?
						</Typography>
					</Link>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Login;
