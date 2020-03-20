import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Box,
	Divider,
	Toolbar,
	Typography,
	Button,
	IconButton
} from '@material-ui/core';

import Logo from '../images/logo.png';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	box: {
		display: 'flex',
		flexGrow: 1
	},
	button: {
		padding: '0.1em 1em'
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		fontWeight: 'bold'
	},
	logo: {
		maxWidth: '40px',
		padding: '1em 0.75em 0.75em 0'
	},
	links: {
		padding: '0 0.75em'
	}
}));

const NavBar = props => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='sticky' elevation={0}>
				<Toolbar className={classes.toolbar}>
					<Link to='/'>
						<img src={Logo} alt='logo' className={classes.logo} />
					</Link>
					<Box className={classes.box}>
						<Typography variant='h5' className={classes.title}>
							udaysamsani
						</Typography>
						<Typography variant='h6' className={classes.links}>
							blog
						</Typography>
					</Box>
					<Button color='inherit' variant='outlined' size='small'>
						<span className={classes.button}>Login</span>
					</Button>
				</Toolbar>
			</AppBar>
			<Divider />
		</div>
	);
};

export default NavBar;
