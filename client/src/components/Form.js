import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Field, Form } from 'formik';
import { Button, Grid, TextField, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import { AuthContext } from '../context/auth';
import { LOGIN_USER, SIGNIN_USER } from '../utils/Graphql';

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
}));

const LoginForm = ({ props }) => {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState(false);
    const [loginUser] = useMutation(LOGIN_USER);
    return (
        <ThemeProvider theme={theme}>
            <Formik
                enableReinitialize={true}
                initialValues={{}}
                onSubmit={async (values, actions) => {
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
                }}
            >
                <Form>
                    <Grid
                        container
                        direction='column'
                        alignItems='center'
                        spacing={2}
                        className={classes.box}
                        error={errors}
                    >
                        <Grid item key='usernameInput'>
                            <Field
                                key='1'
                                as={TextField}
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
                            <Field
                                key='2'
                                as={TextField}
                                id='outlined-basic'
                                type='password'
                                name='password'
                                label='password'
                                variant='outlined'
                                className={classes.field}
                                error={errors}
                            />
                        </Grid>
                        <Grid item>
                            {errors ? (
                                <Alert severity='error'>
                                    Credentials do not match
                                </Alert>
                            ) : null}
                        </Grid>
                        <Grid item key='submit'>
                            <Field
                                as={Button}
                                type='submit'
                                size='large'
                                variant='contained'
                                color='inherit'
                                disableElevation
                                className={classes.button}
                            >
                                Login
                            </Field>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </ThemeProvider>
    );
};

const SigninForm = ({ props }) => {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [signinUser] = useMutation(SIGNIN_USER);
    return (
        <ThemeProvider theme={theme}>
            <Formik
                enableReinitialize={true}
                initialValues={{}}
                onSubmit={async (values, actions) => {
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
                }}
            >
                <Form>
                    <Grid
                        container
                        direction='column'
                        alignItems='center'
                        spacing={2}
                        className={classes.box}
                    >
                        <Grid item key='usernameInput'>
                            <Field
                                key='1'
                                as={TextField}
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
                            <Field
                                key='1'
                                as={TextField}
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
                            <Field
                                key='2'
                                as={TextField}
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
                            <Field
                                key='2'
                                as={TextField}
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
                            <Field
                                key='2'
                                as={TextField}
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
                            {errors.length > 0 ||
                            Object.keys(errors).length > 0 ? (
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
                            <Field
                                as={Button}
                                type='submit'
                                size='large'
                                variant='contained'
                                color='inherit'
                                disableElevation
                                className={classes.button}
                            >
                                Sign in
                            </Field>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </ThemeProvider>
    );
};

export { LoginForm, SigninForm };
