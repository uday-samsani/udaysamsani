import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grommet, ResponsiveContext, Box } from 'grommet';

import NavBar from './components/NavBar';
import MobileNav from './components/MobileNav';
import FullMenu from './components/FullMenu';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Page404 from './pages/Page404';

import './App.css';

const theme = {
	global: {
		font: {
			family: 'Roboto'
		},
		breakpoints: {
			xsmall: {
				value: 500
			},
			small: {
				value: 900
			},
			medium: undefined,
			middle: {
				value: 2000
			}
		},
		size: {
			small: '12px',
			medium: '24px',
			large: '48px',
			xlarge: '96px'
		},
		width: {
			small: '12px',
			medium: '24px',
			large: '48px',
			xlarge: '96px'
		},
		height: {
			small: '12px',
			medium: '24px',
			large: '48px',
			xlarge: '96px'
		}
	}
};

const NavRoute = ({ exact, path, component: Component }) => {
	const [menu, setMenu] = useState(false);

	const handleMenu = e => {
		setMenu(!menu);
	};
	return (
		<Box>
			<Route
				exact={exact}
				path={path}
				render={props => (
					<div>
						<ResponsiveContext.Consumer>
							{size =>
								size === 'xsmall' ? (
									<MobileNav
										menu={menu}
										handleMenu={handleMenu}
									/>
								) : (
									<NavBar />
								)
							}
						</ResponsiveContext.Consumer>
						{menu ? (
							<FullMenu handleMenu={handleMenu} />
						) : (
							<Component {...props} fluid />
						)}
					</div>
				)}
			/>
		</Box>
	);
};

const App = () => {
	return (
		<Grommet theme={theme}>
			<Router>
				<Switch>
					<NavRoute exact path='/' component={Home} />
					<NavRoute path='/blog' component={Blog} />
					<NavRoute path='/projects' component={Projects} />
					<Route path='/login' component={Login} />
					<Route path='/signup' component={Signup} />
					<NavRoute component={Page404} />
				</Switch>
			</Router>
		</Grommet>
	);
};

export default App;
