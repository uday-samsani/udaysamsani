import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Divider, Toolbar, Typography } from '@material-ui/core';

import Logo from '../images/logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box: {
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
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

const NavBarMinimal = ({ props }) => {
    const classes = useStyles();
    const path = props.match.path.split('/')[1] || 'udaysamsani';
    return (
        <div className={classes.root}>
            <AppBar position='sticky' elevation={0} className={classes.box}>
                <Toolbar>
                    <Box className={classes.box}>
                        <Link to='/' className={classes.logo}>
                            <Box className={classes.item}>
                                <img src={Logo} alt='logo' width='40px' />
                            </Box>
                            <Box className={classes.item}>
                                <Typography
                                    variant='h6'
                                    className={classes.logoHeading}
                                >
                                    udaysamsani
                                </Typography>
                            </Box>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <Divider />
        </div>
    );
};

export default NavBarMinimal;
