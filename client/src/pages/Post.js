import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Parse from 'html-react-parser';
import Prism from 'prismjs';
import Moment from 'moment';
import {
    Box,
    Container,
    CircularProgress,
    Typography,
    makeStyles,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import '../css/prism.css';
import '../css/post.css';

import { FETCH_POST_TITLE_QUERY } from '../utils/Graphql';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '1em 0',
    },
    box: {
        display: 'flex',
    },
    heading: {
        fontWeight: '400',
        fontFamily: 'PT Serif',
    },
    subtitle: {
        opacity: '75%',
    },
    share: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    shareIcon: {
        padding: '3px',
        opacity: '75%',
    },
    date: {
        opacity: '75%',
        flexGrow: '1',
    },
}));

const Post = (props) => {
    const classes = useStyles();
    const postTitle = props.match.params.postTitle.replace('-', ' ');
    const { loading, data } = useQuery(FETCH_POST_TITLE_QUERY, {
        variables: {
            postTitle,
        },
    });
    useEffect(() => {
        Prism.highlightAll();
    });
    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <Container maxWidth='md'>
                    <Box className={classes.root}>
                        <Box className={classes.box}>
                            <Typography
                                variant='subtitle2'
                                className={classes.date}
                            >
                                {Moment(data.getPostByTitle.createdAt).format(
                                    'MMM DD, YYYY'
                                )}
                            </Typography>
                            <Box className={classes.share}>
                                <TwitterIcon className={classes.shareIcon} />
                                <LinkedInIcon className={classes.shareIcon} />
                                <FacebookIcon className={classes.shareIcon} />
                                <BookmarkBorderIcon
                                    className={classes.shareIcon}
                                />
                                <MoreVertIcon className={classes.shareIcon} />
                            </Box>
                        </Box>
                        <Typography variant='h2' className={classes.heading}>
                            {data.getPostByTitle.title}
                        </Typography>
                        <Typography variant='h5' className={classes.subtitle}>
                            {data.getPostByTitle.subtitle}
                        </Typography>

                        <Box className={classes.body}>
                            {Parse(data.getPostByTitle.body)}
                        </Box>
                    </Box>
                </Container>
            )}
        </>
    );
};

export default Post;
