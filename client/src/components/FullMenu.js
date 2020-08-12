import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { AuthContext } from '../context/auth';

const useStyles = makeStyles((theme) => ({
    item: {
        padding: '1.5em 2em',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

const FullMenu = (props) => {
    const { user, logout } = useContext(AuthContext);
    const classes = useStyles();
    return (
        <Grid container direction='column' alignItems='center'>
            <Grid item className={classes.item}>
                <Link
                    to='/'
                    className={classes.link}
                    onClick={props.handleShowMenu}
                >
                    <Typography variant='h5'>Home</Typography>
                </Link>
            </Grid>
            <Grid item className={classes.item}>
                <Link
                    to='/blog'
                    className={classes.link}
                    onClick={props.handleShowMenu}
                >
                    <Typography variant='h5'>Blog</Typography>
                </Link>
            </Grid>
            <Grid item className={classes.item}>
                <Link
                    to='/aboutme'
                    className={classes.link}
                    onClick={props.handleShowMenu}
                >
                    <Typography variant='h5'>About me</Typography>
                </Link>
            </Grid>
            <Grid item className={classes.item}>
                {user ? (
                    <Link
                        to='/login'
                        className={classes.link}
                        onClick={() => {
                            logout();
                            props.handleShowMenu();
                        }}
                    >
                        <Typography variant='h5'>Logout</Typography>
                    </Link>
                ) : (
                    <Link
                        to='/login'
                        className={classes.link}
                        onClick={props.handleShowMenu}
                    >
                        <Typography variant='h5'>Login</Typography>
                    </Link>
                )}
            </Grid>
        </Grid>
    );
};

export default FullMenu;
