import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Header, Image, Text } from 'grommet';

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
			<Box direction='row' gap='small' pad={{ horizontal: 'small' }}>
				<Box
					direction='row'
					width='xxsmall'
					height='xxsmall'
					margin={{ vertical: 'auto' }}
				>
					<Image src={logo} fit={'contain'} className='logo' />
				</Box>
				<Box
					direction='row'
					margin={{ vertical: 'auto' }}
					gap='medium'
					align='start'
				>
					<Link
						to='/'
						style={{ textDecoration: 'none', color: '#000000' }}
					>
						<Heading level={3}>udaysamsani.com</Heading>
					</Link>
				</Box>
				<Box
					direction='row'
					margin={{ vertical: 'auto', horizontal: 'small' }}
					gap='medium'
					align='start'
				>
					<Link
						to='/blog'
						style={{ textDecoration: 'none', color: '#000000' }}
					>
						<Text size={'large'}>blog</Text>
					</Link>
					<Link
						to='/projects'
						style={{ textDecoration: 'none', color: '#000000' }}
					>
						<Text size={'large'}>project</Text>
					</Link>
				</Box>
			</Box>
			<Box direction='row' gap='medium'>
				<Box
					direction='row'
					margin={{ vertical: 'auto', horizontal: 'small' }}
				>
					<Link
						to='/login'
						style={{ textDecoration: 'none', color: '#000000' }}
					>
						<Text size={'large'}>login</Text>
					</Link>
				</Box>
			</Box>
		</Header>
	);
};

export default NavBar;
