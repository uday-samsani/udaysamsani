import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { FETCH_BLOGS_QUERY } from '../utils/Graphql';

import Card from '../components/Card';
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2em',
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'spaceed-evenly',
    },
    box: {
        display: 'flex',
    },
    heading: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

const Blog = () => {
    const classes = useStyles();
    const { loading, data } = useQuery(FETCH_BLOGS_QUERY);
    return (
        <Box className={classes.root}>
            <Box className={classes.box}>
                <Typography variant='h4' className={classes.heading}>
                    Blog
                </Typography>
                <Link to='createBlog' className={classes.link}>
                    <Button variant={'outlined'}>Publish Blog</Button>
                </Link>
            </Box>
            {!loading ? (
                data.getPosts.map((post, index) => {
                    return <Card key={index} post={post} />;
                })
            ) : (
                <CircularProgress color='secondary' />
            )}
        </Box>
    );
};

export default Blog;
