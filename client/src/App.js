import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import AuthRoute from './utils/AuthRoute';

import MenuBar from './components/NavBar';
import Home from './pages/Home';
import Blog from './pages/Blog';
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

const NavRoute = ({ exact, path, component: Component }) => (
	<Route
		exact={exact}
		path={path}
		render={props => (
			<div>
				<MenuBar />
				<Component {...props} fluid />
			</div>
		)}
	/>
);

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<NavRoute exact path='/' component={Home} />
					<NavRoute path='/blog' component={Blog} />
					<AuthRoute path='/login' component={Login} />
					<AuthRoute path='/signin' component={Signin} />
					<NavRoute component={Page404} />
				</Switch>
			</Router>
		</ThemeProvider>
	);
};

export default App;
