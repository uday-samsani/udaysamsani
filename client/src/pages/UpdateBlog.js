import React, { useState, useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Editor } from '@tinymce/tinymce-react';
import { DropzoneArea } from 'material-ui-dropzone';
import {
    FETCH_POST_ID_QUERY,
    UPDATE_POST_MUTATION,
    FETCH_POSTS_QUERY,
    UPLOAD_COVER_IMAGE_MUTATION,
} from '../utils/Graphql';

import {
    Button,
    Box,
    Container,
    makeStyles,
    List,
    ListItem,
    Typography,
    TextField,
} from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

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
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        textTransform: 'none',
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
    dropZone: {
        padding: '0 1em',
    },
    textField: {
        padding: '1em',
    },
    editor: {
        padding: '1em',
    },
}));

const UpdateBlog = (props) => {
    const { user } = useContext(AuthContext);
    if (!user) {
        props.history.push('/login');
    }
    const postId = props.match.params.postId;
    const classes = useStyles();
    const { loading, data } = useQuery(FETCH_POST_ID_QUERY, {
        variables: {
            postId,
        },
    });
    const [uploadCoverImage] = useMutation(UPLOAD_COVER_IMAGE_MUTATION);
    const [updatePost] = useMutation(UPDATE_POST_MUTATION);
    const [file, setFile] = useState({});
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [tags, setTags] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data) {
            setTitle(data.getPostById.title);
            setCoverImage(data.getPostById.coverImage);
            setTags(data.getPostById.tags.join(' '));
        }
    }, [data]);
    const handleTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleCoverImage = (files) => {
        setFile(files[0]);
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

    const hanldeSubmit = async (e) => {
        try {
            const {
                loading,
                data: { uploadCoverImage: newCoverImage },
            } = await uploadCoverImage({ variables: { file } });
            if (!loading) {
                updatePost({
                    variables: {
                        postId: postId,
                        title: title,
                        coverImage: newCoverImage,
                        body: body,
                        tags: tags,
                    },
                    update(proxy, result) {
                        const data = proxy.readQuery({
                            query: FETCH_POSTS_QUERY,
                        });
                        data.getPosts = data.getPosts.filter(
                            (post) =>
                                result.data.updatePost._id.toString() !== postId
                        );
                        data.getPosts = [
                            result.data.updatePost,
                            ...data.getPosts,
                        ];
                        proxy.writeQuery({
                            query: FETCH_POSTS_QUERY,
                            data,
                        });
                    },
                });
                props.history.push('/blog');
            }
        } catch (error) {
            if (error.graphQLErrors[0].extensions.errors)
                setErrors(error.graphQLErrors[0].extensions.errors);
        }
    };
    return (
        <>
            {loading ? (
                <p>Loading</p>
            ) : (
                <div className={classes.root}>
                    <Container>
                        <Typography variant='h4' className={classes.title}>
                            Update a post
                        </Typography>
                        <Box className={classes.form}>
                            <MuiThemeProvider theme={theme}>
                                <Box className={classes.textField}>
                                    <TextField
                                        id='title'
                                        label='title'
                                        variant='outlined'
                                        fullWidth
                                        value={title}
                                        onChange={handleTitle}
                                    />
                                </Box>
                                <Box className={classes.dropZone}>
                                    <DropzoneArea
                                        dropzoneText='Cover Image: Drag and Drop or Click'
                                        filesLimit='1'
                                        showFileNamesInPreview={true}
                                        acceptedFiles={[
                                            'image/jpeg',
                                            'image/png',
                                        ]}
                                        onChange={handleCoverImage}
                                    />
                                </Box>
                            </MuiThemeProvider>
                            <Box className={classes.editor}>
                                <Editor
                                    initialValue={data.getPostById.body}
                                    apiKey='tcf56vuyjbooazxljh5h8qjkc54in697lvclr96pgm731ber'
                                    init={{
                                        height: 500,
                                        content_style:
                                            'body {font-size: 18px;} code{font-size: 20px; }',
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
                                            {
                                                text: 'Bash/Shell',
                                                value: 'bash',
                                            },
                                            {
                                                text: 'HTML/XML',
                                                value: 'markup',
                                            },
                                            { text: 'CSS', value: 'css' },
                                            {
                                                text: 'JavaScript',
                                                value: 'javascript',
                                            },
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
                                        value={tags}
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
                            <Box className={classes.buttonContainer}>
                                <Button
                                    variant='contained'
                                    disableElevation
                                    onClick={hanldeSubmit}
                                    className={classes.button}
                                >
                                    Update
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </div>
            )}
        </>
    );
};

export default UpdateBlog;
