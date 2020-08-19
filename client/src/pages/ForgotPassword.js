import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, Grid, Typography } from '@material-ui/core';

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
    link: {
        textDecoration: 'none',
        color: 'inherit',
        opacity: '0.75',
        '&:hover': {
            borderBottom: '1px solid #000000BF',
        },
    },
}));

const ForgotPassword = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Forgot Password - Uday Samsani</title>
                <meta
                    name='description'
                    content='Forgot the account password. We got it covered. Fill the form to get password reset link to your email.'
                />
            </Helmet>
            <Grid
                container
                direction={'column'}
                spacing={2}
                className={classes.root}
            >
                <Grid item>
                    <Typography variant='h4' className={classes.heading}>
                        Forgot password
                    </Typography>
                </Grid>
                <Grid item>
                    <Card className={classes.card} elevation={0}>
                        <ForgotPasswordForm props={props} />
                    </Card>
                </Grid>
                <Grid item>
                    <Link to='/login' className={classes.link}>
                        <Typography variant='overline'>
                            Go back to login
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
};

export default ForgotPassword;
