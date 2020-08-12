import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

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
    },
    button: {
        textTransform: 'none',
    },
    logo: {
        maxWidth: '40px',
        padding: '1em 0.75em 0.75em 0',
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
        padding: '0 0.75em',
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
                <Toolbar className={classes.toolbar}>
                    <Link to='/'>
                        <img src={Logo} alt='logo' className={classes.logo} />
                    </Link>
                    {!isMobile ? (
                        <>
                            <Box className={classes.box}>
                                <Link to='/' className={classes.link}>
                                    <Typography
                                        variant='h5'
                                        className={
                                            path === 'udaysamsani'
                                                ? classes.activeLink
                                                : null
                                        }
                                    >
                                        udaysamsani
                                    </Typography>
                                </Link>
                                <Link to='/blog' className={classes.link}>
                                    <Typography
                                        variant='h6'
                                        className={
                                            path === 'blog'
                                                ? classNames(
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
                                                ? classNames(
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
                                <Link to='/login' className={classes.link}>
                                    <Button
                                        color='inherit'
                                        variant='outlined'
                                        size='medium'
                                        className={classes.button}
                                    >
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Box className={classes.box}>
                                <Link to='/' className={classes.link}>
                                    <Typography
                                        variant='h5'
                                        className={classes.activeLink}
                                    >
                                        {path}
                                    </Typography>
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
