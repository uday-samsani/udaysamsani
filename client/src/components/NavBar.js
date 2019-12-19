import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Header, Image } from 'grommet';

import logo from '../assets/icons/logo.png';
import './css/NavBar.css';

const NavBar = () => {
	const pathname = window.location.pathname;
	const [activeItem, setActiveItem] = useState(pathname.split('/')[2]);
	const handleLinkClick = event => {
		const href = event.target.href.split('/');
		const path = href[href.length - 1];
		setActiveItem(path);
	};

	return (
		<Header>
			<Box direction='row' pad='small'>
				<Box direction='row' width='xsmall' height='xsmall' pad='small'>
					<Image src={logo} fit={'contain'} />
				</Box>
				<Box direction='row' pad='small' gap='medium' align='start'>
					<Link
						to='/'
						style={{ textDecoration: 'none', color: '#000000' }}
					>
						<Heading level={3}>udaysamsani.com</Heading>
					</Link>
					<Link
						to='/blog'
						style={{ textDecoration: 'none', color: '#000000' }}
					>
						<Heading level={3}>blog</Heading>
					</Link>
					<Link
						to='/projects'
						style={{ textDecoration: 'none', color: '#000000' }}
					>
						<Heading level={3}>project</Heading>
					</Link>
				</Box>
			</Box>
			<Box direction='row' pad='small'>
				<Box direction='row' pad='small' gap='medium'>
					<Link
						to='/login'
						style={{ textDecoration: 'none', color: '#000000' }}
					>
						<Heading level={3}>login</Heading>
					</Link>
				</Box>
			</Box>
		</Header>
	);
};

export default NavBar;
