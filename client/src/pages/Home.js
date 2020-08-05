import React from 'react';

import { Container, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typed from 'react-typed';

import HomeIllustration from '../images/Blogging.gif';
import Hand from '../images/hand.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2em 0',
    },
    description: {
        backgroundColor: 'red',
    },
    text: { padding: '1em', textAlign: 'center' },
    wave: {
        marginRight: 3,
        animationName: 'wave-animation',
        animationDuration: '2.5s',
        animationIterationCount: 'infinite',
        transformOrigin: '70% 70%',
        display: 'inline-block',
    },
    contact: {
        backgroundColor: '#efefef',
    },
}));

const Home = (props) => {
    const classes = useStyles();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <div className={classes.root}>
            <Container>
                <Grid
                    container
                    cols={2}
                    justify={isMobile ? 'center' : 'flex-start'}
                    alignItems='center'
                >
                    <Grid item>
                        <img
                            src={HomeIllustration}
                            alt={'Coding Illustration'}
                            width={isMobile ? '350px' : '600px'}
                        />
                    </Grid>
                    <Grid item xs>
                        <Typography variant='h4' className={classes.text} wrap>
                            {'I’m Uday Samsani '}
                            <img
                                src={Hand}
                                width='35px'
                                height='35px'
                                className={classes.wave}
                            />
                            {','}
                            {'I code and design websites and loves '}
                            <Typed
                                strings={[
                                    'learning',
                                    'gaming',
                                    'photography',
                                    'editing',
                                    'exploring',
                                ]}
                                typeSpeed={60}
                                backSpeed={60}
                                loop
                            />
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <div className={classes.contact}>
                <Container>
                    <Typography variant='h7'>
                        Email: satyasaisamsani@gmail.com
                    </Typography>
                </Container>
            </div>
        </div>
    );
};

export default Home;
