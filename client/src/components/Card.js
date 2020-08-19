import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'space-betweeen',
        width: 290,
        height: 325,
        backgroundColor: '#eeeeee',
    },

    media: {
        height: 140,
    },
    noDescription: {
        transition: theme.transitions.create('margin-top', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'none',
        marginTop: 0,
        [theme.breakpoints.up('sm')]: {
            marginTop: 0,
        },
    },
    description: {
        transition: theme.transitions.create('margin-top', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'none',
        marginTop: -90,
        [theme.breakpoints.up('sm')]: {
            marginTop: -90,
        },
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    button: {
        textTransform: 'none',
    },
}));

const BlogCard = ({ post }) => {
    const [elevation, setElevation] = useState(0);
    const classes = useStyles();
    const description = post.body.replace(/<[^>]+>/g, '').split(' ', 40);
    const [readDescription, setReadDescription] = useState(false);

    const handleMouseOver = () => {
        setReadDescription(true);
        setElevation(3);
    };
    const handleMouseOut = () => {
        setReadDescription(false);
        setElevation(0);
    };

    return (
        <Link
            to={`/blog/${post.title.trim().replace(/ /g, '-')}`}
            className={classes.link}
        >
            <Card
                className={classes.root}
                elevation={elevation}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <Box
                    className={
                        post.coverImage
                            ? readDescription
                                ? classes.description
                                : classes.noDescription
                            : null
                    }
                >
                    {post.coverImage ? (
                        <CardMedia
                            className={classes.media}
                            image={
                                'https://storage.googleapis.com/uday-samsani/' +
                                post.coverImage
                            }
                            title={post.title}
                        />
                    ) : null}
                    <CardContent>
                        <Typography variant='caption'>
                            {moment(post.createdAt).format('MMM Do, YYYY')}
                        </Typography>
                        <Typography gutterBottom variant='h5' component='h2'>
                            {post.title}
                        </Typography>
                        <Typography
                            variant='body2'
                            color='textSecondary'
                            component='p'
                        >
                            {!post.coverImage
                                ? description.join(' ')
                                : !readDescription
                                ? description.slice(0, 20).join(' ') + ' ...'
                                : description.join(' ')}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Link>
    );
};

export default BlogCard;
