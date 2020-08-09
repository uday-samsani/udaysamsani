import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Masonry from 'react-masonry-css';
import './blog.css';
import {
    Box,
    Button,
    Container,
    CircularProgress,
    Grid,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../utils/Graphql';

import BlogCard from '../components/Card';
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
    cards: {
        padding: '1.5em 0',
    },
    circularProgress: {
        height: window.innerHeight / 2,
        margin: 'auto 0',
    },
    masonry: {
        padding: '1.5em 0',
    },
    heading: {
        flexGrow: 1,
        fontWeight: '500',
        textAlign: 'center',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

const Blog = () => {
    const classes = useStyles();
    const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
        fetchPolicy: 'cache-and-network',
    });

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        750: 2,
        550: 1,
    };
    const { user } = useContext(AuthContext);

    return (
        <Container className={classes.root} maxWidth='md'>
            <Box className={classes.box}>
                <Typography variant='h4' className={classes.heading}>
                    Blog
                </Typography>
                {user ? (
                    <Link to='/createBlog' className={classes.link}>
                        <Button variant={'outlined'} startIcon={<Add />}>
                            Blog
                        </Button>
                    </Link>
                ) : null}
            </Box>
            <Box className={classes.masonry}>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className='my-masonry-grid'
                    columnClassName='my-masonry-grid_column'
                >
                    {!loading ? (
                        data.getPosts.map((post, index) => {
                            return <BlogCard key={index} post={post} />;
                        })
                    ) : (
                        <Box
                            flex
                            align='center'
                            className={classes.circularProgress}
                        >
                            <CircularProgress color='secondary' />
                        </Box>
                    )}
                </Masonry>
            </Box>
        </Container>
    );
};

export default Blog;
