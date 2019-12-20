import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Footer, Heading, Image, Text } from 'grommet';
import { Facebook, Github, Instagram, Twitter } from 'grommet-icons';

import logo from '../assets/icons/logo.png';

const FootBar = () => {
	return (
		<Footer
			background='#0d0d0d'
			pad={{ vertical: 'small', horizontal: 'medium' }}
		>
			<Box direction='column' gap='medium'>
				<Box direction='row' gap='xsmall'>
					<Box
						direction='row'
						width='40px'
						height='40px'
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
							style={{
								textDecoration: 'none',
								color: '#ffffff'
							}}
						>
							<Text size='medium'>udaysamsani.com</Text>
						</Link>
					</Box>
				</Box>
				<Box>
					<Text size='small'>
						Perfect place for making mistakes and learning from
						them.
					</Text>
				</Box>
			</Box>
			<Box direction='column' gap='medium'>
				<Box direction='row' gap='small'>
					<Box>
						<Github size='medium' color='#fefefe' />
					</Box>
					<Box>
						<Instagram size='medium' color='plain' />
					</Box>
					<Box>
						<Facebook size='medium' color='plain' />
					</Box>
				</Box>
				<Box>
					<Text size='medium' weight={300} color='#514F59'>
						© 2019 udaysamsani
					</Text>
				</Box>
			</Box>
		</Footer>
	);
};

export default FootBar;
