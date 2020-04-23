import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
    Button,
    Box,
    List,
    ListItem,
    Typography,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ReactQuill from 'react-quill';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import { CREATE_POST_MUTATION, FETCH_BLOGS_QUERY } from '../utils/Graphql';

import 'react-quill/dist/quill.snow.css';

import { AuthContext } from '../context/auth';

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
];

const modules = {
    syntax: true,
    toolbar: [
        [{ header: ['1', '2', '3', false] }],
        [('bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block')],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
};

let theme = createMuiTheme({
    palette: {
        primary: {
            light: '#6a6a6a',
            main: '#6a6a6a',
            dark: '#6a6a6a',
            contrastText: '#585858',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2em 0',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
    },
    form: {
        padding: '1em 0',
    },
    fields: {
        flexGrow: 1,
    },
    text: {
        justifyContent: 'flex-start',
    },
    tag: {
        padding: '1em',
    },
    title: {
        padding: ' 0 0.5em',
    },
    textField: {
        padding: '1em',
        width: '400px',
    },
    editor: {
        padding: '1em',
    },
}));

const CreateBlog = (props) => {
    const { user } = useContext(AuthContext);
    if (!user) {
        props.history.push('/login');
    }
    const classes = useStyles();
    const [createPost] = useMutation(CREATE_POST_MUTATION);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [errors, setErrors] = useState({});
    const handleQuill = (value) => {
        setBody(value);
    };
    const handlePost = (event) => {
        try {
            createPost({
                variables: {
                    title: title,
                    subtitle: subtitle,
                    body: body,
                    tags: tags,
                },
                update(proxy, { data: { createPost: post } }) {
                    const data = proxy.readQuery({
                        query: FETCH_BLOGS_QUERY,
                    });
                    data.getBlogs = [post, ...data.getBlogs];
                    proxy.writeQuery({
                        query: FETCH_BLOGS_QUERY,
                        data,
                    });
                },
            });
            props.history.push('/blog');
        } catch (error) {
            console.log(error.graphQLErrors[0].extensions.errors);
            if (error.graphQLErrors[0].extensions.errors)
                setErrors(error.graphQLErrors[0].extensions.errors);
        }
    };
    const handleTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleSubtitle = (event) => {
        setSubtitle(event.target.value);
    };
    const handleTags = (event) => {
        let tags = event.target.value;
        tags = tags.split(',');
        tags = tags.map((tag) => tag.trim()).filter((tag) => tag !== '');
        setTags(tags);
    };

    return (
        <Box className={classes.root}>
            <Typography variant='h4' className={classes.title}>
                Create a post
            </Typography>
            <Box className={classes.form}>
                <MuiThemeProvider theme={theme}>
                    <Box
                        display='flex'
                        flexDirection='row'
                        justifyItems='space-around'
                        alignItems='space-around'
                        className={classes.text}
                    >
                        <Box className={classes.textField}>
                            <TextField
                                id='title'
                                label='title'
                                variant='outlined'
                                fullWidth
                                onChange={handleTitle}
                            />
                        </Box>
                        <Box className={classes.textField}>
                            <TextField
                                id='subtitle'
                                label='subtitle'
                                variant='outlined'
                                fullWidth
                                onChange={handleSubtitle}
                            />
                        </Box>
                    </Box>
                </MuiThemeProvider>
                <Box className={classes.editor}>
                    <ReactQuill
                        theme='snow'
                        formats={formats}
                        modules={modules}
                        onChange={handleQuill}
                    />
                </Box>
                <MuiThemeProvider theme={theme}>
                    <Box
                        display='flex'
                        flexDirection='row'
                        justifyItems='space-around'
                        alignItems='space-around'
                        className={classes.tag}
                    >
                        <TextField
                            id='tags'
                            label='tags'
                            variant='outlined'
                            fullWidth
                            onChange={handleTags}
                        />
                    </Box>
                </MuiThemeProvider>
                {Object.keys(errors).length > 0 ? (
                    <List>
                        {errors.title ? (
                            <ListItem>
                                <Alert
                                    severity='error'
                                    className={classes.alert}
                                >
                                    {errors.title}
                                </Alert>
                            </ListItem>
                        ) : null}
                        {errors.subtitle ? (
                            <ListItem>
                                <Alert
                                    severity='error'
                                    className={classes.alert}
                                >
                                    {errors.subtitle}
                                </Alert>
                            </ListItem>
                        ) : null}
                        {errors.body ? (
                            <ListItem>
                                <Alert
                                    severity='error'
                                    className={classes.alert}
                                >
                                    {errors.body}
                                </Alert>
                            </ListItem>
                        ) : null}
                    </List>
                ) : null}
                <Box className={classes.button}>
                    <Button
                        variant='contained'
                        disableElevation
                        onClick={handlePost}
                    >
                        post
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateBlog;
