import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Parse from 'html-react-parser';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
    readLink: {
        textDecoration: 'none',
        color: 'blue',
    },
    subtitle: {
        fontWeight: '400',
        color: '#585858',
    },
}));

const Card = ({ post }) => {
    const classes = useStyles();
    const words = post.body.replace(/<[^>]+>/g, '').split(' ', 15);
    const description = words.join(' ');
    return (
        <Box className={classes.card}>
            <Link
                to={`/blog/${post.title.trim().replace(/ /g, '-')}`}
                className={classes.link}
            >
                <Typography variant='h5' className={classes.title}>
                    {post.title}
                </Typography>
            </Link>

            <Typography variant='h6' className={classes.subtitle}>
                {post.subtitle}
            </Typography>
            <Typography variant='body1' className={classes.description}>
                {description + ' ... '}
                <Link
                    to={`/blog/${post.title.trim().replace(/ /g, '-')}`}
                    className={classes.readLink}
                >
                    Read more
                </Link>
            </Typography>
            <Typography variant='body2' className={classes.date}>
                {moment(post.createdAt).format('MMMM Do, YYYY')}
            </Typography>
        </Box>
    );
};

export default Card;
