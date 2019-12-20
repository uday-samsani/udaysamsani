import React from 'react';
import { Box, Footer, Text } from 'grommet';
import { Facebook, Github, Instagram } from 'grommet-icons';

import Logo from '../components/Logo';

const FootBar = () => {
	return (
		<Footer
			background='#0d0d0d'
			pad={{ vertical: 'small', horizontal: 'medium' }}
		>
			<Box direction='column' gap='medium'>
				<Logo logoSize='40px' textSize='medium' logoColor='#ffffff' />
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
