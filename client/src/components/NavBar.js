import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Box,
	Divider,
	Toolbar,
	Typography,
	Button
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
	},
	links: {
		padding: '0 0.75em'
	}
}));

const NavBar = props => {
	const classes = useStyles();
	const path = props.match.path.split('/')[1] || 'home';
	return (
		<div className={classes.root}>
			<AppBar position='sticky' elevation={0}>
				<Toolbar className={classes.toolbar}>
					<Link to='/'>
						<img src={Logo} alt='logo' className={classes.logo} />
					</Link>
					<Box className={classes.box}>
						<Link to='/' className={classes.link}>
							<Typography
								variant='h5'
								className={
									path === 'home' ? classes.activeLink : null
								}
							>
								udaysamsani
							</Typography>
						</Link>
						<Link to='/blog' className={classes.link}>
							<Typography
								variant='h6'
								className={
									path === 'blog'
										? classNames(
												classes.activeLink,
												classes.links
										  )
										: classes.links
								}
							>
								blog
							</Typography>
						</Link>
						<Link to='/projects' className={classes.link}>
							<Typography
								variant='h6'
								className={
									path === 'projects'
										? classNames(
												classes.activeLink,
												classes.links
										  )
										: classes.links
								}
							>
								projects
							</Typography>
						</Link>
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
