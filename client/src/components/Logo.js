import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Text } from 'grommet';

import logo from '../assets/icons/logo.png';

const Logo = ({ logoSize, textSize, logoColor, textWeight }) => {
	return (
		<Box direction='row' gap='xsmall'>
			<Box
				direction='row'
				width={logoSize}
				height={logoSize}
				margin={{ vertical: 'auto' }}
			>
				<Image src={logo} fit={'contain'} />
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
						color: logoColor
					}}
				>
					<Text size={textSize} weight={textWeight}>
						udaysamsani.com
					</Text>
				</Link>
			</Box>
		</Box>
	);
};

export default Logo;
