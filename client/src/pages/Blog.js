import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import { Box, Heading, Text } from 'grommet';

const blogsQuery = gql`
	{
		blogs: getPosts {
			_id
			title
			subtitle
			body
			user {
				_id
				username
				email
			}
			createdAt
		}
	}
`;

const Blog = () => {
	const { loading, data } = useQuery(blogsQuery);
	return (
		<Box pad={{ vertical: 'medium', horizontal: 'xlarge' }}>
			<Text size='40px' weight='500'>
				Blogs
			</Text>
			<Box direction='column' gap='small' pad={{ vertical: 'medium' }}>
				{!loading
					? data.blogs.map(blog => {
							console.log('jk');
							return (
								<Box
									direction='column'
									pad='medium'
									background='#000000'
									width={{ min: '300px', max: '700px' }}
								>
									<Text size='medium'>{blog.title}</Text>
									<Text size='xsmall'>
										{'Posted on ' +
											moment(blog.createAt).format(
												'Do MMMM, YYYY'
											)}
									</Text>
									<Text size='small' truncate>
										{blog.body}
									</Text>
								</Box>
							);
					  })
					: null}
			</Box>
		</Box>
	);
};

export default Blog;
