import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    Box,
    Button,
    Container,
    Typography,
    makeStyles,
    useMediaQuery,
} from '@material-ui/core';
import PageNotFoundIllustration from '../images/PageNotFound.svg';

const useStyles = makeStyles(() => ({
    root: {
        height: '85vh',
        display: 'grid',
        placeItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    button: {
        backgroundColor: '#6c63ff',
        color: '#fff',
        textTransform: 'none',
    },
    text: {
        textAlign: 'center',
    },
}));

const Page404 = (props) => {
    const classes = useStyles();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <Container>
            <Box className={classes.root}>
                <Box className={classes.image}>
                    <img
                        src={PageNotFoundIllustration}
                        width={isMobile ? '100%' : '700px'}
                        alt='Page not found'
                    />
                </Box>
                <Box className={classes.text}>
                    <Typography variant='h2'>Page not found</Typography>
                    <Link className={classes.link}>
                        <Button
                            variant={'contained'}
                            disableElevation
                            className={classes.button}
                        >
                            Go back to Home
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Page404;
