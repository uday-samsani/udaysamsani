import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Header, Image } from 'grommet';
import { Menu, Close } from 'grommet-icons';

import logo from '../assets/icons/logo.png';
import avatar from '../assets/icons/avatar.png';

const MobileNav = ({ menu, handleMenu }) => {
	return (
		<Header>
			<Box direction='row' pad='small' margin='small'>
				<Link
					to='/'
					style={{ textDecoration: 'none', color: '#000000' }}
				>
					<Box
						direction='row'
						width='xxsmall'
						height='xxsmall'
						margin={{ vertical: 'auto' }}
					>
						<Image src={logo} fit={'contain'} />
					</Box>
				</Link>
			</Box>
			<Box
				direction='row-reverse'
				pad={{ vertical: 'small', horizontal: 'medium' }}
				gap='medium'
			>
				<Box
					direction='row'
					width='xxsmall'
					height='xxsmall'
					margin={{ vertical: 'auto' }}
					pad='xsmall'
				>
					{/* <Login plain size='medium' color='#000000' /> */}
					<Image src={avatar} fit='contain' />
				</Box>
				<Box
					direction='row'
					onClick={handleMenu}
					margin={{ vertical: 'auto' }}
				>
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
