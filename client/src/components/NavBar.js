import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Button,
    Box,
    Divider,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import Logo from '../images/logo.png';
import { AuthContext } from '../context/auth';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    button: {
        textTransform: 'none',
    },
    buttons: {
        padding: '5px',
    },
    activeLink: {
        textDecoration: 'none',
        color: 'inherit',
        fontWeight: 'bold',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    links: {
        padding: '0 7px',
    },
    item: {
        padding: '0 5px',
    },
    logoHeading: {
        fontWeight: '500',
    },
    logo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
    },
}));

const NavBar = (props) => {
    const classes = useStyles();
    const { user, logout } = useContext(AuthContext);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const path = props.match.path.split('/')[1] || 'udaysamsani';
    return (
        <div className={classes.root}>
            <AppBar position='sticky' elevation={0}>
                <Toolbar>
                    {!isMobile ? (
                        <>
                            <Box className={classes.box}>
                                <Link to='/' className={classes.logo}>
                                    <Box className={classes.item}>
                                        <img
                                            src={Logo}
                                            alt='logo'
                                            width='40px'
                                        />
                                    </Box>
                                    <Box className={classes.item}>
                                        <Typography
                                            variant='h6'
                                            className={
                                                path === 'udaysamsani'
                                                    ? classes.activeLink
                                                    : classes.logoHeading
                                            }
                                        >
                                            udaysamsani
                                        </Typography>
                                    </Box>
                                </Link>
                                <Link to='/blog' className={classes.link}>
                                    <Typography
                                        variant='h6'
                                        className={
                                            path === 'blog'
                                                ? clsx(
                                                      classes.activeLink,
                                                      classes.links
                                                  )
                                                : classes.links
                                        }
                                    >
                                        blog
                                    </Typography>
                                </Link>
                                <Link to='/aboutme' className={classes.link}>
                                    <Typography
                                        variant='h6'
                                        className={
                                            path === 'aboutme'
                                                ? clsx(
                                                      classes.activeLink,
                                                      classes.links
                                                  )
                                                : classes.links
                                        }
                                    >
                                        about me
                                    </Typography>
                                </Link>
                            </Box>
                            {user ? (
                                <Link
                                    to='/login'
                                    className={classes.link}
                                    onClick={logout}
                                >
                                    <Button
                                        color='inherit'
                                        variant='outlined'
                                        size='medium'
                                        className={classes.button}
                                    >
                                        Logout
                                    </Button>
                                </Link>
                            ) : (
                                <Box display='flex'>
                                    <Box className={classes.buttons}>
                                        <Link
                                            to='/login'
                                            className={classes.link}
                                        >
                                            <Button
                                                color='inherit'
                                                size='medium'
                                                className={classes.button}
                                            >
                                                Log in
                                            </Button>
                                        </Link>
                                    </Box>
                                    <Box className={classes.buttons}>
                                        <Link
                                            to='/signin'
                                            className={classes.link}
                                        >
                                            <Button
                                                color='inherit'
                                                variant='outlined'
                                                size='medium'
                                                className={classes.button}
                                            >
                                                Sign in
                                            </Button>
                                        </Link>
                                    </Box>
                                </Box>
                            )}
                        </>
                    ) : (
                        <>
                            <Box className={classes.box}>
                                <Link to='/' className={classes.logo}>
                                    <Box className={classes.item}>
                                        <img
                                            src={Logo}
                                            alt='logo'
                                            width='40px'
                                        />
                                    </Box>
                                    <Box className={classes.item}>
                                        <Typography
                                            variant='h6'
                                            className={
                                                path
                                                    ? classes.activeLink
                                                    : classes.logoHeading
                                            }
                                        >
                                            {path === 'udaysamsani'
                                                ? 'Uday Samsani'
                                                : path === 'aboutme'
                                                ? 'About Me'
                                                : path === 'signin'
                                                ? 'Sign In'
                                                : path === 'create-blog'
                                                ? 'Create Blog'
                                                : path === 'update-blog'
                                                ? 'Update Blog'
                                                : path === 'password-reset'
                                                ? 'Password Reset'
                                                : path
                                                      .trim()
                                                      .replace(/^\w/, (c) =>
                                                          c.toUpperCase()
                                                      )}
                                        </Typography>
                                    </Box>
                                </Link>
                            </Box>
                            <IconButton
                                aria-label='options'
                                className={classes.menuButton}
                                onClick={props.handleShowMenu}
                                color='inherit'
                                size='small'
                            >
                                {props.showMenu ? <CloseIcon /> : <MenuIcon />}
                            </IconButton>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Divider />
        </div>
    );
};

export default NavBar;
