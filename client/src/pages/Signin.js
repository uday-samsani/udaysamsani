import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, useMediaQuery, Typography } from '@material-ui/core';

import { SigninForm } from '../components/Form';
import WelcomeIllustration from '../images/Welcome.svg';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    box: {
        justifyContent: 'space-around',
        alignContent: 'center',
        padding: '2em 0',
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
        <Grid
            container
            className={classes.box}
            justify='center'
            alignItems='center'
        >
            {!isMobile ? (
                <Grid item className={classes.image}>
                    <img
                        src={WelcomeIllustration}
                        width={'450px'}
                        alt='Welcome'
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
                        Welcome to the family
                    </Typography>
                    <SigninForm props={props} />
                    <Link to='/login' className={classes.link}>
                        <Typography variant='overline'>
                            Already have an account?
                        </Typography>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
