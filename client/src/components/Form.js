import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { useMutation } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import {
    Box,
    Button,
    Grid,
    Typography,
    TextField,
    List,
    ListItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import { AuthContext } from '../context/auth';
import {
    LOGIN_USER,
    SIGNIN_USER,
    RESET_PASSWORD_MUTATION,
    SEND_RESET_PASSWORD_LINK_MUATATION,
} from '../utils/Graphql';

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
    box: {
        padding: '1em 0',
    },
    field: {
        width: '300px',
    },
    alert: {
        width: '250px',
    },
    button: {
        textTransform: 'none',
    },
    forgotPassword: {
        color: 'teal',
        '&:hover': {
            borderBottom: '1px solid teal',
        },
    },
}));

const ForgotPasswordForm = ({ props }) => {
    const classes = useStyles();
    const [sendResetPasswordLink] = useMutation(
        SEND_RESET_PASSWORD_LINK_MUATATION
    );
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true);
            await sendResetPasswordLink({
                variables: {
                    email: values.email,
                },
            });
            actions.setSubmitting(false);
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    container
                    direction='column'
                    alignItems='center'
                    spacing={2}
                    className={classes.box}
                >
                    <Grid item key='email'>
                        <TextField
                            key='1'
                            id='outlined-basic'
                            type='email'
                            name='email'
                            label='username or email'
                            variant='outlined'
                            className={classes.field}
                        />
                    </Grid>
                    <Grid item key='submit'>
                        <Button
                            type='submit'
                            // size='large'
                            variant='contained'
                            color='inherit'
                            disableElevation
                            fullWidth={true}
                            className={classes.button}
                        >
                            Send password reset email
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </ThemeProvider>
    );
};

const PasswordResetForm = ({ props }) => {
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);
    const formik = useFormik({
        initialValues: {
            password: '',
            retypePassword: '',
        },
        onSubmit: async (values, actions) => {
            if (values.retypePassword !== values.password) {
                setErrors(true);
            } else {
                actions.setSubmitting(true);
                try {
                    await resetPassword({
                        variables: {
                            retypePassword: values.retypePassword,
                            password: values.password,
                            token: props.match.params.token,
                        },
                        update() {
                            localStorage.removeItem('jwtToken');
                            props.history.push('/login');
                        },
                    });
                } catch (error) {
                    setErrors(error.graphQLErrors[0].extensions);
                }
                actions.setSubmitting(false);
            }
        },
    });
    return (
        <ThemeProvider theme={theme}>
            {errors.token ? (
                <Box>
                    <Typography variant='h4'>Link expired</Typography>
                    <Typography variant='body1'>
                        This link has expired. Please click verify email again.
                    </Typography>
                </Box>
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <Grid
                        container
                        direction='column'
                        alignItems='center'
                        spacing={2}
                        className={classes.box}
                        error={errors}
                    >
                        <Grid item key='passwordInput'>
                            <TextField
                                key='1'
                                id='outlined-basic'
                                type='password'
                                name='retypePassword'
                                label='retype password'
                                variant='outlined'
                                className={classes.field}
                                error={errors.password}
                            />
                        </Grid>
                        <Grid item key='retypePasswordInput'>
                            <TextField
                                key='2'
                                id='outlined-basic'
                                type='password'
                                name='password'
                                label='password'
                                variant='outlined'
                                className={classes.field}
                                error={errors.password}
                            />
                        </Grid>
                        <Grid item>
                            {errors.password ? (
                                <Alert severity='error'>
                                    Passwords do not match
                                </Alert>
                            ) : null}
                        </Grid>

                        <Grid item key='submit'>
                            <Button
                                type='submit'
                                size='large'
                                variant='contained'
                                color='inherit'
                                disableElevation
                                className={classes.button}
                            >
                                Change password
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </ThemeProvider>
    );
};

const LoginForm = ({ props }) => {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState(false);
    const [loginUser] = useMutation(LOGIN_USER);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { username: '', password: '' },
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true);
            try {
                await loginUser({
                    variables: {
                        username: values.username,
                        password: values.password,
                    },
                    update(_, { data: { login: user } }) {
                        context.login(user);
                        props.history.push('/');
                    },
                });
            } catch (error) {
                setErrors(true);
            }
            actions.setSubmitting(false);
        },
    });

    const handleForgotPassword = (e) => {};
    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    container
                    direction='column'
                    alignItems='center'
                    spacing={2}
                    className={classes.box}
                    error={errors}
                >
                    <Grid item key='usernameInput'>
                        <TextField
                            key='1'
                            type='text'
                            id='outlined-basic'
                            name='username'
                            label='username'
                            variant='outlined'
                            className={classes.field}
                            error={errors}
                        />
                    </Grid>
                    <Grid item key='passwordInput'>
                        <TextField
                            key='2'
                            id='outlined-basic'
                            type='password'
                            name='password'
                            label='password'
                            variant='outlined'
                            className={classes.field}
                            error={errors}
                        />
                    </Grid>
                    <Grid item key='button'>
                        <Box onClick={handleForgotPassword}>
                            <Typography
                                variant='body2'
                                className={classes.forgotPassword}
                            >
                                Forgot password?
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        {errors ? (
                            <Alert severity='error'>
                                Credentials do not match
                            </Alert>
                        ) : null}
                    </Grid>
                    <Grid item key='submit'>
                        <Button
                            type='submit'
                            size='large'
                            variant='contained'
                            color='inherit'
                            disableElevation
                            className={classes.button}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </ThemeProvider>
    );
};

const SigninForm = ({ props }) => {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [signinUser] = useMutation(SIGNIN_USER);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {},
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true);
            try {
                await signinUser({
                    variables: {
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        confirmPassword: values.confirmPassword,
                        dob: new Date(values.dob).toISOString(),
                    },
                    update(_, { data: { signin: user } }) {
                        context.login(user);
                        props.history.push('/');
                    },
                });
            } catch (error) {
                if (error.graphQLErrors[0].extensions.errors)
                    setErrors(error.graphQLErrors[0].extensions.errors);
            }
            actions.setSubmitting(false);
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    container
                    direction='column'
                    alignItems='center'
                    spacing={2}
                    className={classes.box}
                >
                    <Grid item key='usernameInput'>
                        <TextField
                            key='1'
                            type='text'
                            id='outlined-basic'
                            name='username'
                            label='username'
                            variant='outlined'
                            className={classes.field}
                            error={errors.username}
                        />
                    </Grid>
                    <Grid item key='emailInput'>
                        <TextField
                            key='2'
                            type='email'
                            id='outlined-basic'
                            name='email'
                            label='email'
                            variant='outlined'
                            className={classes.field}
                            error={errors.email}
                        />
                    </Grid>
                    <Grid item key='passwordInput'>
                        <TextField
                            key='3'
                            id='outlined-basic'
                            type='password'
                            name='password'
                            label='password'
                            variant='outlined'
                            className={classes.field}
                            error={errors.password}
                        />
                    </Grid>
                    <Grid item key='passwordConfirmInput'>
                        <TextField
                            key='4'
                            id='outlined-basic'
                            type='password'
                            name='confirmPassword'
                            label='password'
                            variant='outlined'
                            className={classes.field}
                            error={errors.password}
                        />
                    </Grid>
                    <Grid item key='dobInput'>
                        <TextField
                            key='5'
                            id='outlined-basic'
                            type='date'
                            name='dob'
                            label='date of birth'
                            variant='outlined'
                            className={classNames(
                                classes.field,
                                classes.dateInput
                            )}
                            error={errors.dob}
                        />
                    </Grid>
                    <Grid item>
                        {errors.length > 0 || Object.keys(errors).length > 0 ? (
                            <List>
                                {errors.username ? (
                                    <ListItem>
                                        <Alert
                                            severity='error'
                                            className={classes.alert}
                                        >
                                            {errors.username}
                                        </Alert>
                                    </ListItem>
                                ) : null}
                                {errors.password ? (
                                    <ListItem>
                                        <Alert
                                            severity='error'
                                            className={classes.alert}
                                        >
                                            {errors.password}
                                        </Alert>
                                    </ListItem>
                                ) : null}
                                {errors.email ? (
                                    <ListItem>
                                        <Alert
                                            severity='error'
                                            className={classes.alert}
                                        >
                                            {errors.email}
                                        </Alert>
                                    </ListItem>
                                ) : null}

                                {errors.dob ? (
                                    <ListItem>
                                        <Alert
                                            severity='error'
                                            className={classes.alert}
                                        >
                                            {errors.dob}
                                        </Alert>
                                    </ListItem>
                                ) : null}
                            </List>
                        ) : null}
                    </Grid>
                    <Grid item key='submit'>
                        <Button
                            type='submit'
                            size='large'
                            variant='contained'
                            color='inherit'
                            disableElevation
                            className={classes.button}
                        >
                            Sign in
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </ThemeProvider>
    );
};

export { ForgotPasswordForm, PasswordResetForm, LoginForm, SigninForm };
