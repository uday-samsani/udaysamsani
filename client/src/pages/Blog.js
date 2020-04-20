import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { FETCH_BLOGS_QUERY } from '../utils/Graphql';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2em',
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'spaceed-evenly',
    },
    card: {
        border: '1px solid #33333320',
        borderRadius: '4px',
        padding: '0.5em 1em',
        marginTop: '1em',
    },
    date: {
        color: '#585858',
    },
    title: {
        fontSize: '1.5em',
        fontWeight: '500',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    subtitle: {
        fontWeight: '400',
        color: '#585858',
    },
}));

const Blog = () => {
    const classes = useStyles();
    const { loading, data } = useQuery(FETCH_BLOGS_QUERY);
    return (
        <Box className={classes.root}>
            <Link to='createBlog' className={classes.link}>
                <Button variant={'outlined'}>Publish Blog</Button>
            </Link>
            {!loading ? (
                data.getPosts.map((post) => {
                    return (
                        <Box className={classes.card}>
                            <Typography variant='h5' className={classes.title}>
                                {post.title}
                            </Typography>

                            <Typography
                                variant='h6'
                                className={classes.subtitle}
                            >
                                {post.subtitle}
                            </Typography>
                            {/* <Label
					tags={post.tags}
					className={classes.labels}
				/>*/}
                            <Typography
                                variant='body2'
                                className={classes.date}
                            >
                                {moment(post.createdAt).format('MMMM Do, YYYY')}
                            </Typography>
                        </Box>
                    );
                })
            ) : (
                <CircularProgress color='secondary' />
            )}
        </Box>
    );
};

export default Blog;
