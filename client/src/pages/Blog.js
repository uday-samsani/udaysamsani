import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import {
    Box,
    Button,
    Container,
    CircularProgress,
    Grid,
    Typography,
    useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../utils/Graphql';

import BlogCard from '../components/Card';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'space-evenly',
    },
    box: {
        display: 'flex',
        padding: '1em 0',
    },
    button: {
        textTransform: 'none',
    },
    cards: {
        padding: '1.5em 0',
        margin: '0',
    },
    circularProgress: {
        height: window.innerHeight / 2,
        margin: 'auto 0',
    },
    heading: {
        flexGrow: 1,
        textAlign: 'center',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

const Blog = () => {
    const classes = useStyles();
    const { user } = useContext(AuthContext);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
        fetchPolicy: 'cache-and-network',
    });

    return (
        <Container className={classes.root} maxWidth='md'>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Blog - Uday Samsani</title>
                <meta
                    name='description'
                    content='Welcome to my personal blog page. Learn different concepts and things from blog posts that I have published. For updates kindly sign in and join the family.'
                />
            </Helmet>
            <Box className={classes.box}>
                <Typography variant='h4' className={classes.heading}>
                    Blog
                </Typography>
                {user ? (
                    <Link to='/create-blog' className={classes.link}>
                        <Button
                            variant={'outlined'}
                            startIcon={<Add />}
                            className={classes.button}
                        >
                            Blog
                        </Button>
                    </Link>
                ) : null}
            </Box>
            <Box>
                <Grid
                    container
                    className={classes.cards}
                    spacing='1'
                    justify={isMobile ? 'center' : null}
                >
                    {!loading ? (
                        data.getPosts.map((post, index) => {
                            return (
                                <Grid item>
                                    <BlogCard key={index} post={post} />
                                </Grid>
                            );
                        })
                    ) : (
                        <Grid
                            container
                            justify='center'
                            className={classes.circularProgress}
                        >
                            <Grid item>
                                <CircularProgress color='secondary' />
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Container>
    );
};

export default Blog;
