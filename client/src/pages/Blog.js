import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import {
    Box,
    Button,
    Container,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../utils/Graphql';

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
            {!loading ? (
                data.getPosts.map((post, index) => {
                    return <Card key={index} post={post} />;
                })
            ) : (
                <CircularProgress color='secondary' />
            )}
        </Container>
    );
};

export default Blog;
