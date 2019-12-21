import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Box, Text } from 'grommet';

import TextCard from '../components/TextCard';

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
			<Box direction='column' gap='medium' pad={{ vertical: 'medium' }}>
				{!loading
					? data.blogs.map(blog => {
							return <TextCard blog={blog} />;
					  })
					: null}
			</Box>
		</Box>
	);
};

export default Blog;
