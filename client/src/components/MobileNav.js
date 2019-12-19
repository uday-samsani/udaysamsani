import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Header, Image } from 'grommet';
import { Menu, Close, Login } from 'grommet-icons';

import logo from '../assets/icons/logo.png';

const MobileNav = ({ menu, handleMenu }) => {
	return (
		<Header>
			<Box direction='row' pad='small'>
				<Link
					to='/'
					style={{ textDecoration: 'none', color: '#000000' }}
				>
					<Box
						direction='row'
						width='xxsmall'
						height='xxsmall'
						margin='small'
					>
						<Image src={logo} fit={'contain'} />
					</Box>
				</Link>
			</Box>
			<Box
				direction='row'
				pad={{ vertical: 'small', horizontal: 'medium' }}
				gap='medium'
			>
				<Box direction='row'>
					<Login plain size='medium' color='#000000' />
				</Box>
				<Box direction='row' onClick={handleMenu}>
					{menu === false ? (
						<Menu plain size='medium' color='#000000' />
					) : (
						<Close plain size='medium' color='#000000' />
					)}
				</Box>
			</Box>
		</Header>
	);
};

export default MobileNav;
