import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useMutation } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import clsx from 'clsx';
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
    SEND_PASSWORD_RESET_LINK_MUATATION,
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
    alert: {
        width: '250px',
    },
    button: {
        textTransform: 'none',
    },
    fullButton: {
        width: '300px',
    },
    forgotPassword: {
        display: 'inline-block',
        color: 'teal',
        '&:hover': {
            borderBottom: '1px solid teal',
        },
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

const ForgotPasswordForm = ({ props }) => {
    const classes = useStyles();
    const [result, setResult] = useState('');
    const [sendPasswordResetLink] = useMutation(
        SEND_PASSWORD_RESET_LINK_MUATATION
    );
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: async (values) => {
            setResult(
                await sendPasswordResetLink({
                    variables: {
                        email: values.email,
                    },
                })
            );
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    container
                    direction='column'
                    spacing={2}
                    className={classes.box}
                >
                    {result === '' ? (
                        <>
                            <Grid item>
                                <Typography variant='body2'>
                                    Enter your user account's verified email
                                    address and we will send you a password
                                    reset link.
                                </Typography>
                            </Grid>
                            <Grid item key='email'>
                                <TextField
                                    key='1'
                                    id='outlined-basic'
                                    type='email'
                                    name='email'
                                    label='email'
                                    variant='outlined'
                                    size='small'
                                    onChange={formik.handleChange}
                                    fullWidth
                                    className={classes.field}
                                />
                            </Grid>
                            <Grid item key='submit'>
                                <Button
                                    type='submit'
                                    size='medium'
                                    variant='contained'
                                    color='inherit'
                                    disableElevation
                                    className={clsx(
                                        classes.button,
                                        classes.fullButton
                                    )}
                                >
                                    Send password reset email
                                </Button>
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item>
                                <Typography variant='body1'>
                                    Check your email for a link to reset your
                                    password. If it doesn’t appear within a few
                                    minutes, check your spam folder.
                                </Typography>
                            </Grid>
                            <Grid item key='submit'>
                                <Link to='/login' className={classes.link}>
                                    <Button
                                        size='medium'
                                        variant='contained'
                                        color='inherit'
                                        disableElevation
                                        className={clsx(
                                            classes.button,
                                            classes.fullButton
                                        )}
                                    >
                                        Return to log in
                                    </Button>
                                </Link>
                            </Grid>
                        </>
                    )}
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
        initialValues: {},
        onSubmit: async (values) => {
            if (values.retypePassword !== values.password) {
                setErrors(true);
            } else {
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
            }
        },
    });
    return (
        <ThemeProvider theme={theme}>
            {errors.token ? (
                <Box>
                    <Typography variant='body1'>
                        This link has expired. Please click verify email again.
                    </Typography>
                </Box>
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <Grid
                        container
                        direction='column'
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
                                size='small'
                                fullWidth
                                onChange={formik.handleChange}
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
                                size='small'
                                fullWidth
                                onChange={formik.handleChange}
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
                                size='medium'
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
        onSubmit: async (values) => {
            console.log(values);
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
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    container
                    direction='column'
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
                            size='small'
                            fullWidth
                            onChange={formik.handleChange}
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
                            size='small'
                            fullWidth
                            onChange={formik.handleChange}
                            className={classes.field}
                            error={errors}
                        />
                    </Grid>
                    <Grid item key='button'>
                        <Link to='/password-reset'>
                            <Typography
                                variant='body2'
                                className={classes.forgotPassword}
                            >
                                Forgot password?
                            </Typography>
                        </Link>
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
                            size='medium'
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
                            size='small'
                            fullWidth
                            onChange={formik.handleChange}
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
                            size='small'
                            fullWidth
                            onChange={formik.handleChange}
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
                            size='small'
                            fullWidth
                            onChange={formik.handleChange}
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
                            size='small'
                            fullWidth
                            onChange={formik.handleChange}
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
                            size='small'
                            fullWidth
                            onChange={formik.handleChange}
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
                            size='medium'
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
