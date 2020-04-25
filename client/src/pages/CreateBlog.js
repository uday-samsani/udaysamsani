import React, { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Editor } from '@tinymce/tinymce-react';

import {
    Button,
    Box,
    List,
    ListItem,
    Typography,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/Graphql';

import { AuthContext } from '../context/auth';

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
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [tags, setTags] = useState([]);
    const [errors, setErrors] = useState({});
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
    const handleEditor = (e) => {
        setBody(e.target.getContent());
    };

    const hanldeSubmit = (e) => {
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
                        query: FETCH_POSTS_QUERY,
                    });
                    data.getBlogs = [post, ...data.getPosts];
                    proxy.writeQuery({
                        query: FETCH_POSTS_QUERY,
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
                    <Editor
                        initialValue='<p>Initial content</p>'
                        apiKey='tcf56vuyjbooazxljh5h8qjkc54in697lvclr96pgm731ber'
                        init={{
                            height: 500,
                            mobile: {
                                theme: 'mobile',
                            },
                            plugins: [
                                'advlist autolink lists link image imagetools',
                                'charmap print preview anchor help',
                                'searchreplace visualblocks code codesample',
                                'insertdatetime media table paste wordcount',
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic | \
                                alignleft aligncenter alignright | \
                                link image imagetools media | codesample preview | \
                                bullist numlist outdent indent | code help',
                            codesample_languages: [
                                { text: 'Bash/Shell', value: 'bash' },
                                { text: 'HTML/XML', value: 'markup' },
                                { text: 'CSS', value: 'css' },
                                { text: 'JavaScript', value: 'javascript' },
                                { text: 'Python', value: 'python' },
                                { text: 'Java', value: 'java' },
                                { text: 'C', value: 'c' },
                                { text: 'C++', value: 'cpp' },
                            ],
                        }}
                        onChange={handleEditor}
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
                        onClick={hanldeSubmit}
                    >
                        post
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateBlog;
