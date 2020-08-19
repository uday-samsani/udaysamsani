import React, { useState, useContext, Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { Box, Container, makeStyles } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import { AuthContext, AuthProvider } from './context/auth';
import NavBar from './components/NavBar';
import NavBarMinimal from './components/NavBarMinimal';
import FullMenu from './components/FullMenu';
import Footer from './components/Footer';

import Login from './pages/Login';
import Signin from './pages/Signin';
import Verify from './pages/Verify';
import PasswordReset from './pages/PasswordReset';
import ForgotPassword from './pages/ForgotPassword';

import Home from './pages/Home';
import Blog from './pages/Blog';
import Post from './pages/Post';
import AboutMe from './pages/AboutMe';
import CreateBlog from './pages/CreateBlog';
import UpdateBlog from './pages/UpdateBlog';
import Page404 from './pages/Page404';

import './App.css';

let theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ffffff',
            main: '#fafafa',
            dark: '#e4e4e4',
            contrastText: '#333333',
        },
        secondary: {
            light: '#C6ECEC',
            main: '#bae8e8',
            dark: '#78C8B4',
            contrastText: '#333333',
        },
    },
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    body: {
        flexGrow: '1',
    },
}));

const AuthRoute = ({ component: Component, ...rest }) => {
    const classes = useStyles();
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Redirect to='/' />
                ) : (
                    <Box className={classes.box}>
                        <NavBarMinimal props={props} />
                        <Container className={classes.body}>
                            <Component {...props} />
                        </Container>
                        <Footer />
                    </Box>
                )
            }
        />
    );
};

const MinimalRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <>
                    <NavBarMinimal props={props} />
                    <Container>
                        <Component {...props} />
                    </Container>
                    <Footer />
                </>
            )}
        />
    );
};

const NavRoute = ({ exact, path, component: Component }) => {
    const [showMenu, setShowMenu] = useState(false);
    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    };
    return (
        <Route
            exact={exact}
            path={path}
            render={(props) => (
                <>
                    <NavBar
                        {...props}
                        showMenu={showMenu}
                        handleShowMenu={handleShowMenu}
                    />
                    {showMenu ? (
                        <FullMenu handleShowMenu={handleShowMenu} />
                    ) : (
                        <Component {...props} fluid />
                    )}
                    {!showMenu ? <Footer /> : null}
                </>
            )}
        />
    );
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <Switch>
                        <NavRoute exact path='/' component={Home} />
                        <NavRoute
                            exact
                            path='/blog/:postTitle'
                            component={Post}
                        />
                        <NavRoute path='/blog' component={Blog} />
                        <NavRoute path='/create-blog' component={CreateBlog} />
                        <NavRoute
                            path='/update-blog/:postId'
                            component={UpdateBlog}
                        />
                        <NavRoute path='/aboutme' component={AboutMe} />
                        <AuthRoute path='/login' component={Login} />
                        <AuthRoute path='/signin' component={Signin} />
                        <MinimalRoute
                            path='/verify/:token'
                            component={Verify}
                        />
                        <MinimalRoute
                            exact
                            path='/password-reset'
                            component={ForgotPassword}
                        />
                        <MinimalRoute
                            path='/password-reset/:token'
                            component={PasswordReset}
                        />
                        <NavRoute component={Page404} />
                    </Switch>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
