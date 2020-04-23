import React from 'react';

const BlogView = (props) => {
    const blogId = props.match.params.blogId;
    return <p>BlogView {blogId}</p>;
};

export default BlogView;
