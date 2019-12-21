import React from 'react';
import moment from 'moment';
import { Anchor, Box, Text } from 'grommet';

const TextCard = ({ blog }) => {
	return (
		<Box
			direction='column'
			pad='medium'
			background='#e8e8e8'
			width={{ min: '300px', max: '700px' }}
			gap='xsmall'
		>
			<Text size='large' color='000807' weight='500'>
				{blog.title}
			</Text>
			<Text size='small' color='454B4A'>
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
