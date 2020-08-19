import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Grid, Box, useMediaQuery, Typography } from '@material-ui/core';

import { LoginForm } from '../components/Form';
import LoginIllustration from '../images/Login.svg';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    box: {
        justifyContent: 'space-around',
        alignContent: 'center',
        padding: '2em 0',
        height: '50vh',
        placeItems: 'center',
    },
    image: {
        padding: '2em',
    },
    form: {
        textAlign: 'center',
    },
    item: {
        paddingTop: '0.5em',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        opacity: '0.5',
        '&:hover': {
            borderBottom: '1px solid #00000080',
        },
    },
}));

const Login = (props) => {
    const classes = useStyles();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Login - Uday Samsani</title>
                <meta
                    name='description'
                    content='Login into my web portfolio blog to interact and get notififications when ever I post new content.'
                />
            </Helmet>
            <Grid
                container
                className={classes.box}
                justify='center'
                alignItems='center'
            >
                {!isMobile ? (
                    <Grid item className={classes.image}>
                        <img
                            src={LoginIllustration}
                            width={'500px'}
                            alt='Login'
                        />
                    </Grid>
                ) : null}
                <Grid item>
                    <Box className={classes.form}>
                        <Typography
                            variant='h3'
                            className={classes.item}
                            style={{ fontWeight: '300' }}
                        >
                            Welcome, back
                        </Typography>
                        <LoginForm props={props} />
                        <Link to='/signin' className={classes.link}>
                            <Typography variant={'overline'}>
                                Don't have an account?
                            </Typography>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
