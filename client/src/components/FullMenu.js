import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text } from 'grommet';

const FullMenu = ({ handleMenu }) => {
	return (
		<Box direction='column' pad='medium' align='center'>
			<Box pad='medium'>
				<Link
					to='/'
					style={{ textDecoration: 'none', color: '#000000' }}
					onClick={handleMenu}
				>
					<Text size={'large'}>home</Text>
				</Link>
			</Box>
			<Box pad='medium'>
				<Link
					to='/blog'
					style={{ textDecoration: 'none', color: '#000000' }}
					onClick={handleMenu}
				>
					<Text size={'large'}>blog</Text>
				</Link>
			</Box>
			<Box pad='medium'>
				<Link
					to='/projects'
					style={{ textDecoration: 'none', color: '#000000' }}
					onClick={handleMenu}
				>
					<Text size={'large'}>project</Text>
				</Link>
			</Box>
		</Box>
	);
};

export default FullMenu;
