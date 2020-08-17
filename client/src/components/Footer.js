import React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Container,
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
        padding: '1em 0',
        display: 'flex',
        flexGrow: 1,
    },
    caption: {
        opacity: '0.7',
    },
    item: {
        padding: '0 10px',
    },
    twitterLink: {
        color: 'inherit',
        opacity: '0.7',
        '&:hover': {
            color: '#1da1f2',
        },
    },
    instagramLink: {
        color: 'inherit',
        opacity: '0.7',
        '&:hover': {
            color: '#a32fb7',
        },
    },
    linkedinLink: {
        color: 'inherit',
        opacity: '0.7',
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
            <Box className={classes.root}>
                <Container className={classes.container}>
                    <Grid
                        container
                        spacing={2}
                        direction={isMobile ? 'column' : 'row'}
                        justify={isMobile ? 'center' : 'space-between'}
                        alignContent='center'
                        alignItems={isMobile ? 'center' : null}
                    >
                        <Grid item>
                            <Box
                                display='flex'
                                flexDirection='row'
                                justify='space-between'
                                alignContent='center'
                            >
                                <Box className={classes.item}>
                                    <Typography
                                        variant='body2'
                                        className={classes.caption}
                                    >
                                        Follow me on
                                    </Typography>
                                </Box>
                                <Box className={classes.item}>
                                    <a
                                        href='https://twitter.com/samsaniuday'
                                        className={classes.twitterLink}
                                    >
                                        <TwitterIcon />
                                    </a>
                                </Box>
                                <Box className={classes.item}>
                                    <a
                                        href='https://www.instagram.com/uday_samsani/'
                                        className={classes.instagramLink}
                                    >
                                        <InstagramIcon />
                                    </a>
                                </Box>
                                <Box className={classes.item}>
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
                            <Typography
                                variant='body2'
                                className={classes.caption}
                            >
                                © 2020 all rights reserved
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default Footer;
