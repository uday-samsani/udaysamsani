import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Box, Grid, Typography } from '@material-ui/core';

import { ForgotPasswordForm } from '../components/Form';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        padding: '2em 0',
        height: '85vh',
        placeItems: 'center',
    },
    card: {
        padding: '1em',
        width: '300px',
        backgroundColor: '#eeeeee',
    },
    heading: {
        fontWeight: '200',
    },
}));

const ForgotPassword = (props) => {
    const classes = useStyles();
    return (
        <Grid
            container
            direction={'column'}
            spacing={2}
            className={classes.root}
        >
            <Grid item>
                <Typography
                    variant='h4'
                    className={classes.heading}
                    style={{ fontWeight: '300' }}
                >
                    Forgot password
                </Typography>
            </Grid>
            <Grid item>
                <Card className={classes.card} elevation={0}>
                    <Box>
                        <Typography variant='body1'>
                            Enter your user account's verified email address and
                            we will send you a password reset link.
                        </Typography>
                    </Box>
                    <ForgotPasswordForm props={props} />
                </Card>
            </Grid>
        </Grid>
    );
};

export default ForgotPassword;
