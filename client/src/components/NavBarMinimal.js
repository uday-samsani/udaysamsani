import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Divider, Toolbar, Typography } from '@material-ui/core';

import Logo from '../images/logo.png';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	box: {
		display: 'flex',
		justifyItems: 'center',
		alignItems: 'center'
	},
	logo: {
		maxWidth: '40px',
		padding: '1em 0.75em 0.75em 0'
	},
	activeLink: {
		textDecoration: 'none',
		color: 'inherit',
		fontWeight: 'bold'
	},
	link: {
		textDecoration: 'none',
		color: 'inherit'
	}
}));

const NavBarMinimal = ({ props }) => {
	const classes = useStyles();
	const path = props.match.path.split('/')[1] || 'udaysamsani';
	return (
		<div className={classes.root}>
			<AppBar position='sticky' elevation={0} className={classes.box}>
				<Toolbar>
					<Box className={classes.box}>
						<Link to='/'>
							<img
								src={Logo}
								alt='logo'
								className={classes.logo}
							/>
						</Link>
						<Link to='/' className={classes.link}>
							<Typography
								variant='h5'
								className={
									path === 'udaysamsani'
										? classes.activeLink
										: null
								}
							>
								udaysamsani
							</Typography>
						</Link>
					</Box>
				</Toolbar>
			</AppBar>
			<Divider />
		</div>
	);
};

export default NavBarMinimal;
