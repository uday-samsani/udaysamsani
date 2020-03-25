import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { Container } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import AuthRoute from './utils/AuthRoute';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Page404 from './pages/Page404';

let theme = createMuiTheme({
	palette: {
		primary: {
			light: '#ffffff',
			main: '#fafafa',
			dark: '#e4e4e4',
			contrastText: '#333333'
		},
		secondary: {
			light: '#C6ECEC',
			main: '#bae8e8',
			dark: '#78C8B4',
			contrastText: '#333333'
		}
	}
});

theme = responsiveFontSizes(theme);

const NavRoute = ({ exact, path, component: Component }) => {
	return (
		<Route
			exact={exact}
			path={path}
			render={props => (
				<>
					<NavBar {...props} />
					<Container>
						<Component {...props} fluid />
					</Container>
				</>
			)}
		/>
	);
};

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<NavRoute exact path='/' component={Home} />
					<NavRoute path='/blog' component={Blog} />
					<NavRoute path='/projects' component={Projects} />
					<AuthRoute path='/login' component={Login} />
					<AuthRoute path='/signin' component={Signin} />
					<NavRoute component={Page404} />
				</Switch>
			</Router>
		</ThemeProvider>
	);
};

export default App;
