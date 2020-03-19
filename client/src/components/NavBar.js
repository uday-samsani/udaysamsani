import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Header, Text } from 'grommet';

import Logo from '../components/Logo';

import './css/NavBar.css';

const NavBar = () => {
	// const pathname = window.location.pathname;
	// const [activeItem, setActiveItem] = useState(pathname.split('/')[2]);
	// const handleLinkClick = event => {
	// 	const href = event.target.href.split('/');
	// 	const path = href[href.length - 1];
	// 	setActiveItem(path);
	// };

	return (
		<Header>
			<Box direction='row' gap='small' pad='small'>
				<Logo
					logoSize='xxsmall'
					textSize='xlarge'
					logoColor='#000000'
					textWeight={500}
				/>

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
