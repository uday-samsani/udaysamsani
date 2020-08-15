import React from 'react';
import { Link } from 'react-router-dom';
import {
    Grid,
    Box,
    Button,
    useMediaQuery,
    Typography,
} from '@material-ui/core';

import { PasswordResetForm } from '../components/Form';
import ForgotPassword from '../images/ForgotPassword.svg';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    box: {
        justifyContent: 'space-around',
        alignContent: 'center',
        padding: '2em 0',
        height: '85vh',
        placeItems: 'center',
    },
    button: {
        textTransform: 'none',
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
        opacity: '0.75',
        '&:hover': {
            borderBottom: '1px solid #000000BF',
        },
    },
}));

const PasswordReset = (props) => {
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
                    <img src={ForgotPassword} width={'500px'} alt='Login' />
                </Grid>
            ) : null}
            <Grid item>
                <Box className={classes.form}>
                    <Typography
                        variant='h3'
                        className={classes.item}
                        style={{ fontWeight: '300' }}
                    >
                        Reset password
                    </Typography>
                    <PasswordResetForm props={props} />
                    <Link to='/login' className={classes.link}>
                        <Typography variant='overline'>
                            Go back to login
                        </Typography>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PasswordReset;
