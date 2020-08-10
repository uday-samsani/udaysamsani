import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import clsx from 'clsx';

import {
    Box,
    Button,
    Card,
    CardActions,
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
        height: 300,
        backgroundColor: '#eeeeee',
    },
    media: {
        height: 140,
    },
    description: {
        marginTop: -90,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
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
                            : null
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
                    <Link
                        to={`/blog/${post.title.trim().replace(/ /g, '-')}`}
                        className={classes.link}
                    >
                        <Typography gutterBottom variant='h5' component='h2'>
                            {post.title}
                        </Typography>
                    </Link>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                    >
                        {!post.coverImage
                            ? description.join(' ')
                            : !readDescription
                            ? description.slice(0, 14).join(' ') + ' ...'
                            : description.join(' ')}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions>
                <Link
                    to={`/blog/${post.title.trim().replace(/ /g, '-')}`}
                    className={classes.link}
                >
                    <Button size='small'>Read More</Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
