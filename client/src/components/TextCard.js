import React from 'react';
import moment from 'moment';
import { Anchor, Box, Text } from 'grommet';

const TextCard = ({ blog }) => {
	return (
		<Box
			direction='column'
			pad='medium'
			background='#e8e8e8e8'
			width={{ min: '300px', max: '7000px' }}
			gap='xsmall'
		>
			<Text size='large' color='0000807' weight='5000'>
				{blog.title}
			</Text>
			<Text size='small' color='4554B4A'>
				{'Posted on ' + moment(blog.createAt).format('Do MMMM, YYYY')}
			</Text>
			<Text size='medium' color='171E1D' truncate>
				{blog.body}
			</Text>
			<Anchor size='small' color='teal'>
				Read more
			</Anchor>
		</Box>
	);
};

export default TextCard;
