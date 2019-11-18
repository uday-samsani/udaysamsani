import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	makeStyles,
	AppBar,
	Toolbar,
	Typography,
	IconButton
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles(theme => ({
	navBar: {
		backgroundColor: '#373737'
	},
	menuButton: {
		marginRight: '1rem',
		padding: '0.5rem',
		backgroundColor: '#fff',
		color: '#000',
		marginBottom: 7
	},
	title: {
		fontFamily: 'Barlow',
		fontWeight: 600,
		padding: 'auto',
		color: '#fff',
		paddingRight: '1rem',
		textDecoration: 'none'
	},
	item: {
		fontFamily: 'Barlow',
		fontWeight: 500,
		color: '#fff',
		textDecoration: 'none',
		padding: '0.5rem',
		margin: '0 0.5rem'
	},
	activeItem: {
		padding: '0.5rem',
		borderBottom: '2px solid #fff'
	},
	navLeft: {
		flex: 1,
		padding: 'auto'
	},
	navRight: {
		flex: 1,
		padding: 'auto'
	}
}));

export default function NavBar() {
	const classes = useStyles();

	const pathname = window.location.pathname;
	const [activeItem, setActiveItem] = useState(pathname.split('/')[2]);
	const handleLinkClick = event => {
		const href = event.target.href.split('/');
		const path = href[href.length - 1];
		setActiveItem(path);
	};

	return (
		<AppBar position='static' className={classes.navBar} elevation={0}>
			<Toolbar>
				<Typography
					variant='h5'
					className={classes.title}
					component={Link}
					to='/'
					onClick={handleLinkClick}
				>
					udaysamsani.com
				</Typography>
				<div className={classes.navRight}>
					<Typography
						variant='h6'
						className={[
							classes.item,
							activeItem === 'blog' ? classes.activeItem : null
						]}
						component={Link}
						to='/blog'
						onClick={handleLinkClick}
					>
						Blog
					</Typography>
					<Typography
						variant='h6'
						className={[
							classes.item,
							activeItem === 'projects'
								? classes.activeItem
								: null
						]}
						component={Link}
						to='/projects'
						onClick={handleLinkClick}
					>
						Projects
					</Typography>
				</div>
				<div className='classes.navLeft'>
					<IconButton
						className={classes.menuButton}
						color='inherit'
						aria-label='menu'
					>
						<MoreHorizIcon />
					</IconButton>
					<Typography
						variant='h6'
						className={[
							classes.item,
							activeItem === 'login' ? classes.activeItem : null
						]}
						component={Link}
						to='/login'
						onClick={handleLinkClick}
					>
						Login
					</Typography>
				</div>
			</Toolbar>
		</AppBar>
	);
}
