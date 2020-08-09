import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import clsx from 'clsx';

import {
    Button,
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        backgroundColor: '#eeeeee',
    },
    media: {
        height: 140,
    },
    mediaClose: {
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        height: 0,
        [theme.breakpoints.up('sm')]: {
            height: 0,
        },
    },
}));

const BlogCard = ({ post }) => {
    const classes = useStyles();
    const description = post.body.replace(/<[^>]+>/g, '').split(' ', 25);
    const [readDescription, setReadDescription] = useState(false);

    const handleReadDescription = (e) => {
        setReadDescription(!readDescription);
    };

    return (
        <Card className={classes.root} elevation={0}>
            <CardActionArea onClick={handleReadDescription}>
                {post.coverImage ? (
                    <CardMedia
                        className={
                            !readDescription
                                ? classes.media
                                : clsx(classes.media, classes.mediaClose)
                        }
                        image={
                            'https://storage.googleapis.com/uday-samsani/' +
                            post.coverImage
                        }
                        title={post.title}
                    />
                ) : null}
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {post.title}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                    >
                        {!readDescription
                            ? description.slice(0, 13).join(' ') + ' ...'
                            : description.join(' ')}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size='small'>Read More</Button>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
