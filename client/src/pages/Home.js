import React from 'react';

import { Container, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typed from 'react-typed';
import { Helmet } from 'react-helmet';

import HomeIllustration from '../images/Home.svg';
import Hand from '../images/hand.svg';
import './Home.css';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2em 0',
    },
    description: {
        backgroundColor: 'red',
    },
    text: { textAlign: 'center', display: 'block' },
    wave: {
        marginRight: 3,
        animationName: 'wave-animation',
        animationDuration: '2.5s',
        animationIterationCount: 'infinite',
        transformOrigin: '70% 70%',
        display: 'inline-block',
    },
    container: {
        paddingBottom: '0',
    },
    contact: {
        backgroundColor: '#003964',
        padding: '2em',
        color: '#ffffff',
    },
    grid: {
        padding: '2em 0',
    },
    typed: {
        padding: '1.5em',
    },
    body: {
        fontWeight: '200',
    },
    heading: {
        fontWeight: '400',
    },
}));

const Home = (props) => {
    const classes = useStyles();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <div className={classes.root}>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Uday Samsani</title>
                <meta
                    name='description'
                    content='I am Uday Samsani, I code and design websites and love photography, gaming, exporing, editing.'
                />
                <meta name='og:type' property='og:type' content='website'>
                <meta
                    name='og:title'
                    property='og:title'
                    content='Uday Samsani'
                />
                <meta
                    name='og:description'
                    property='og:description'
                    content='I am Uday Samsani, I code and design websites and love photography, gaming, exporing, editing.'
                />
                <meta
                    name='og:image'
                    property='og:image'
                    content='https://storage.googleapis.com/uday-samsani/static/logo.png'
                />
                <meta
                    name='og:url'
                    property='og:url'
                    content={window.location.href}
                />
                <meta name='twitter:card' content='summary_large_image' />

                <meta
                    name='og:site_name'
                    property='og:site_name'
                    content='Uday Samsani'
                />
                <meta name='twitter:image:alt' content='Uday Samsani' />

                <meta
                    name='fb:app_id'
                    property='fb:app_id'
                    content='UdaySamsani'
                />
                <meta name='twitter:site' content='@SamsaniUday'></meta>
            </Helmet>
            <Container className={classes.container}>
                <Grid
                    container
                    cols={2}
                    spacing={3}
                    justify={isMobile ? 'center' : 'space-between'}
                    alignItems='center'
                    className={classes.grid}
                >
                    <Grid item>
                        <img
                            src={HomeIllustration}
                            alt={'Coding Illustration'}
                            width={isMobile ? '100%' : '600px'}
                        />
                    </Grid>
                    <Grid item xs className={classes.typed}>
                        <Typography variant='h4' className={classes.text} wrap>
                            {'I’m Uday Samsani '}
                            <img
                                src={Hand}
                                width='35px'
                                height='35px'
                                alt='hello hand emoji'
                                className={classes.wave}
                            />
                            {','}
                        </Typography>

                        <Typography variant='h4' className={classes.text} wrap>
                            {'I code and design websites '}
                        </Typography>

                        <Typography variant='h4' className={classes.text} wrap>
                            {'and loves '}
                            <Typed
                                strings={[
                                    '<span class="learning">learning</span>',
                                    '<span class="photography">photography</span>',
                                    '<span class="editing">editing</span>',
                                    '<span class="exploring">exploring</span>',
                                    '<span class="gaming">gaming</span>',
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
                    <Grid
                        container
                        cols={3}
                        justify={isMobile ? 'flex-start' : 'space-between'}
                        alignItems='center'
                    >
                        <Grid item>
                            <Typography
                                variant='h6'
                                className={classes.heading}
                            >
                                E:{' '}
                            </Typography>
                            <Typography variant='h7' className={classes.body}>
                                satyasaisamsani@gmail.com
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant='h6'
                                className={classes.heading}
                            >
                                M:{' '}
                            </Typography>
                            <Typography variant='h7' className={classes.body}>
                                +91 9948861133
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant='h6'
                                className={classes.heading}
                            >
                                A:{' '}
                            </Typography>
                            <Typography variant='h7' className={classes.body}>
                                Vijayawada, Andhra Pradesh, India
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
};

export default Home;
