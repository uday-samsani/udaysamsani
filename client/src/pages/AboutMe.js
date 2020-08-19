import React from 'react';
import { Helmet } from 'react-helmet';
import {
    Box,
    Button,
    Container,
    Chip,
    Grid,
    Typography,
    makeStyles,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';

import ProfileImage from '../images/ProfilePic.jpg';
import Hand from '../images/hand.svg';

const useStyles = makeStyles((theme) => ({
    heading: {
        padding: '1em 0',
    },
    grid: {
        padding: '2em',
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    wave: {
        marginRight: 3,
        animationName: 'wave-animation',
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        transformOrigin: '70% 70%',
        display: 'inline-block',
    },
    skills: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    skill: {
        margin: theme.spacing(0.5),
    },
    resume: {
        display: 'inline',
        color: 'teal',
        borderBottom: '1px solid teal',
    },
}));

const AboutMe = (props) => {
    const classes = useStyles();

    const skills = [
        { key: 0, label: 'C' },
        { key: 1, label: 'C++' },
        { key: 2, label: 'Python' },
        { key: 3, label: 'Java' },
        { key: 4, label: 'JavaScript' },
        { key: 5, label: 'React.js' },
        { key: 6, label: 'Node.js' },
        { key: 7, label: 'MongoDB' },
        { key: 8, label: 'SQL' },
    ];
    return (
        <Container>
            <Helmet>
                <meta charSet='utf-8' />
                <title>About me - Uday Samsani</title>
                <meta
                    name='description'
                    content='Hello, I’m Uday Samsani, Information Technology
                    student of Vishnu Institute of Technology,
                    Bhimavaram. I am a Fullstack Web Designer based
                    in India who loves to code and design websites.
                    I am freelancer and always ready to take up the
                    challenge.'
                />
            </Helmet>
            <Grid
                container
                cols={2}
                spacing={5}
                flex
                justify='center'
                alignItems='center'
                className={classes.grid}
            >
                <Grid item>
                    <img
                        className={classes.image}
                        src={ProfileImage}
                        alt='uday samsani'
                    />
                </Grid>
                <Grid item xs>
                    <Box>
                        <Box className={classes.heading}>
                            <Typography variant='h4'>
                                <RemoveIcon /> About me
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='h7'>
                                Hello{' '}
                                {
                                    <img
                                        src={Hand}
                                        width='20px'
                                        height='20px'
                                        className={classes.wave}
                                    />
                                }
                                , I’m Uday Samsani, Information Technology
                                student of Vishnu Institute of Technology,
                                Bhimavaram. I am a Fullstack Web Designer based
                                in India who loves to code and design websites.
                                I am freelancer and always ready to take up the
                                challenge.
                            </Typography>
                        </Box>
                        <Box>
                            <Box className={classes.heading}>
                                <Typography variant='h4'>
                                    <RemoveIcon /> Skills
                                </Typography>
                            </Box>
                            <Box component='ul' className={classes.skills}>
                                {skills.map((skill) => (
                                    <li key={skill.key}>
                                        <Chip
                                            label={skill.label}
                                            className={classes.skill}
                                        />
                                    </li>
                                ))}
                            </Box>
                        </Box>
                        <Box className={classes.heading}>
                            <Typography
                                variant='body1'
                                className={classes.resume}
                            >
                                Download my resume
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutMe;
