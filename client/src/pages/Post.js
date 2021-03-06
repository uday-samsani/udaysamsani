import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import Parse from 'html-react-parser';
import Prism from 'prismjs';
import Moment from 'moment';

import clsx from 'clsx';
import {
    Box,
    Container,
    CircularProgress,
    Typography,
    makeStyles,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import '../css/prism.css';
import '../css/post.css';

import { FETCH_POST_TITLE_QUERY } from '../utils/Graphql';
import { VerticalPostDropdown } from '../components/Dropdown';
import { AuthContext } from '../context/auth';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '1em 0',
    },
    box: {
        display: 'flex',
        alignItems: 'center',
    },
    heading: {
        fontWeight: '600',
        fontFamily: 'PT Serif',
    },
    subtitle: {
        opacity: '75%',
    },
    share: {
        display: 'flex',
    },
    shareIcon: {
        padding: '5px',
        fontSize: '27px',
        alignItems: 'center',
    },
    shareTwitter: {
        '&:hover': {
            color: '#1da1f2',
        },
    },
    shareFacebook: {
        '&:hover': {
            color: '#4267b2',
        },
    },
    shareLinkedin: {
        '&:hover': {
            color: '#0073b0',
        },
    },
    shareLink: {
        color: 'inherit',
    },
    date: {
        opacity: '75%',
        flexGrow: '1',
    },
}));

const Post = (props) => {
    const { user } = useContext(AuthContext);
    const classes = useStyles();
    const postTitle = props.match.params.postTitle.replace(/-/g, ' ');

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
                <Box className={classes.loader}>
                    <CircularProgress color={'secondary'} />
                </Box>
            ) : (
                <Container maxWidth='md'>
                    <Helmet>
                        <meta charSet='utf-8' />
                        <title>
                            {data.getPostByTitle.title + ' - Uday Samsani'}
                        </title>
                        <meta name='og:type' content='article' />
                        <meta
                            name='description'
                            content={data.getPostByTitle.body
                                .replace(/<[^>]+>/g, '')
                                .split(' ', 40)}
                        />
                        <meta
                            property='og:title'
                            content={data.getPostByTitle.title}
                        />
                        <meta
                            property='og:description'
                            content={data.getPostByTitle.body
                                .replace(/<[^>]+>/g, '')
                                .split(' ', 40)}
                        />
                        {data.getPostByTitle.coverImage ? (
                            <meta
                                propert='og:image'
                                content={
                                    'https://storage.googleapis.com/uday-samsani/' +
                                    data.getPostByTitle.coverImage
                                }
                            />
                        ) : null}
                        <meta
                            property='og:url'
                            content={window.location.href}
                        />

                        <meta property='og:site_name' content='Uday Samsani' />
                        <meta property='fb:app_id' content='UdaySamsani' />

                        <meta
                            property='twitter:title'
                            content={data.getPostByTitle.title}
                        />
                        <meta
                            property='twitter:description'
                            content={data.getPostByTitle.body
                                .replace(/<[^>]+>/g, '')
                                .split(' ', 40)}
                        />
                        {data.getPostByTitle.coverImage ? (
                            <meta
                                property='twitter:image'
                                content={
                                    'https://storage.googleapis.com/uday-samsani/' +
                                    data.getPostByTitle.coverImage
                                }
                            />
                        ) : null}
                        <meta
                            property='twitter:card'
                            content={data.getPostByTitle.body
                                .replace(/<[^>]+>/g, '')
                                .split(' ', 40)}
                        />
                        <meta property='twitter:site' content='@SamsaniUday' />
                    </Helmet>
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
                                <a
                                    className={classes.shareLink}
                                    href={
                                        'https://twitter.com/intent/tweet?text=Check%20this%20out%20' +
                                        window.location.href
                                    }
                                >
                                    <TwitterIcon
                                        className={clsx(
                                            classes.shareIcon,
                                            classes.shareTwitter
                                        )}
                                    />
                                </a>
                                <a
                                    className={classes.shareLink}
                                    href='https://www.facebook.com/sharer/sharer.php?u=udaysamsani.me'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <FacebookIcon
                                        className={clsx(
                                            classes.shareIcon,
                                            classes.shareFacebook
                                        )}
                                    />
                                </a>

                                <BookmarkBorderIcon
                                    className={classes.shareIcon}
                                />
                                {user ? (
                                    user.role === 'admin' ||
                                    user.role === 'editor' ? (
                                        <VerticalPostDropdown
                                            props={props}
                                            postId={data.getPostByTitle._id}
                                            path={
                                                data.getPostByTitle.coverImage.split(
                                                    '/',
                                                    2
                                                )[0] + '/'
                                            }
                                            filename={
                                                data.getPostByTitle.coverImage.split(
                                                    '/',
                                                    2
                                                )[1]
                                            }
                                        />
                                    ) : null
                                ) : null}
                            </Box>
                        </Box>
                        {data.getPostByTitle.coverImage ? (
                            <img
                                className='img-responsive'
                                src={
                                    'https://storage.googleapis.com/uday-samsani/' +
                                    data.getPostByTitle.coverImage
                                }
                                alt={data.getPostByTitle.title}
                            />
                        ) : null}

                        <Typography variant='h2' className={classes.heading}>
                            {data.getPostByTitle.title}
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
