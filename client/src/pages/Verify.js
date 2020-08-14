import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Grid, useMediaQuery, Typography } from '@material-ui/core';
import VerifyImage from '../images/Verified.svg';

import { makeStyles } from '@material-ui/styles';
import { VERIFY_USER } from '../utils/Graphql';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '90vh',
        placeItems: 'center',
    },
    links: {
        textDecoration: 'none',
        color: 'inherit',
    },
    link: {
        color: 'teal',
        borderBottom: '1px solid teal',
    },
}));

const Verify = (props) => {
    const classes = useStyles();
    const [result, setResult] = useState('');
    const [errors, setErrors] = useState({});
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [verify] = useMutation(VERIFY_USER);
    const [token, setToken] = useState(props.match.params.token);
    useEffect(async () => {
        if (token !== '') {
            try {
                const { loading, data } = await verify({
                    variables: { token },
                });
                if (!loading) {
                    setResult(data.verify);
                }
            } catch (error) {
                console.log(error.graphQLErrors[0].extensions.exception);
            }
        }
    }, [token]);
    return (
        <Grid
            container
            cols={2}
            spacing={3}
            className={classes.root}
            alignContent='center'
            justify={isMobile ? 'flex-start' : 'space-evenly'}
        >
            <Grid item>
                <img
                    src={VerifyImage}
                    alt='Email verified'
                    width={isMobile ? '100%' : '600px'}
                />
            </Grid>
            <Grid item>
                {errors ? (
                    <>
                        <Typography variant='h4'>Link expired</Typography>
                        <Typography variant='body1'>
                            This link has expired. Please click verify email
                            again.
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant='h4'>Email verified</Typography>
                        <Typography variant='body1'>
                            Your email address has been succesfully verified.
                        </Typography>
                        <Link to='/' className={classes.links}>
                            <Typography
                                variant='overline'
                                className={classes.link}
                            >
                                Go back to home
                            </Typography>
                        </Link>
                    </>
                )}
            </Grid>
        </Grid>
    );
};

export default Verify;
