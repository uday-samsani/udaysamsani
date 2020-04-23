import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Parser from 'html-react-parser';
import {
    Box,
    CircularProgress,
    Typography,
    makeStyles,
} from '@material-ui/core';

import { FETCH_POST_TITLE_QUERY } from '../utils/Graphql';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '1em 0',
    },
    heading: {
        fontWeight: '400',
    },
    subtitle: {
        opacity: '75%',
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
    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box className={classes.root}>
                    <Typography variant='h3' className={classes.heading}>
                        {data.getPostByTitle.title}
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        className={classes.subtitle}
                    >
                        {data.getPostByTitle.subtitle}
                    </Typography>
                    <Box className={classes.body}>
                        {Parser(data.getPostByTitle.body)}
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Post;
