import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { FETCH_POST_TITLE_QUERY } from '../utils/Graphql';

const Post = (props) => {
    const postTitle = props.match.params.postTitle.replace('-', ' ');
    const { loading, data } = useQuery(FETCH_POST_TITLE_QUERY, {
        variables: {
            postTitle,
        },
    });
    return <p>blogView {!loading ? data.getPostByTitle.title : 'Loading..'}</p>;
};

export default Post;
