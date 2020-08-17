import React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Container,
    Divider,
    makeStyles,
    useMediaQuery,
    Typography,
    Grid,
} from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import Logo from '../images/logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fafafa',
        padding: '1em 0',
        display: 'flex',
        flexGrow: 1,
    },
    box: {
        display: 'flex',
        flexGrow: 1,
    },
    icon: {
        padding: '0 1em',
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
    twitterLink: {
        color: 'inherit',
        '&:hover': {
            color: '#1da1f2',
        },
    },
    instagramLink: {
        color: 'inherit',
        '&:hover': {
            color: '#e78076',
        },
    },
    linkedinLink: {
        color: 'inherit',
        '&:hover': {
            color: '#0077b5',
        },
    },
}));

const Footer = (props) => {
    const classes = useStyles();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <div>
            <Divider />
            <Box className={classes.root}>
                <Container className={classes.container}>
                    <Grid
                        container
                        spacing={2}
                        direction={isMobile ? 'column' : 'row'}
                        justify={isMobile ? 'center' : 'space-between'}
                        alignItems='center'
                    >
                        <Grid item>
                            `
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
                        </Grid>
                        <Grid item>
                            <Box
                                display='flex'
                                flexDirection='row'
                                justify='space-between'
                                alignItems='center'
                            >
                                <Box className={classes.icon}>
                                    <a
                                        href='https://twitter.com/samsaniuday'
                                        className={classes.twitterLink}
                                    >
                                        <TwitterIcon />
                                    </a>
                                </Box>
                                <Box className={classes.icon}>
                                    <a
                                        href='https://www.instagram.com/uday_samsani/'
                                        className={classes.instagramLink}
                                    >
                                        <InstagramIcon />
                                    </a>
                                </Box>
                                <Box className={classes.icon}>
                                    <a
                                        href='https://www.linkedin.com/in/uday-samsani-0314b0137'
                                        className={classes.linkedinLink}
                                    >
                                        <LinkedInIcon />
                                    </a>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Typography variant='body2'>
                                © 2020 ALL RIGHTS RESERVED
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default Footer;
