import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { FETCH_BLOG_TITLE_QUERY } from '../utils/Graphql';

const BlogView = (props) => {
    const blogTitle = props.match.params.blogTitle.replace('-', ' ');
    console.log(blogTitle);
    const { loading, data } = useQuery(FETCH_BLOG_TITLE_QUERY, {
        variables: {
            blogTitle,
        },
    });
    return <p>blogView {!loading ? data.getPostByTitle.title : 'Loading..'}</p>;
};

export default BlogView;
