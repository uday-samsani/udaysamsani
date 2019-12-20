import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grommet, ResponsiveContext } from 'grommet';

import NavBar from './components/NavBar';
import MobileNav from './components/MobileNav';
import FullMenu from './components/FullMenu';
import FootBar from './components/FootBar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Login from './pages/Login';

import './App.css';

// TODO: need to degign home page
// TODO: Migrate to grommet

const App = () => {
	const [menu, setMenu] = useState(false);

	const handleMenu = e => {
		setMenu(!menu);
	};

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

	return (
		<Grommet theme={theme}>
			<Router>
				<ResponsiveContext.Consumer>
					{size =>
						size === 'xsmall' ? (
							<MobileNav menu={menu} handleMenu={handleMenu} />
						) : (
							<NavBar />
						)
					}
				</ResponsiveContext.Consumer>
				{menu === true ? (
					<FullMenu handleMenu={handleMenu} />
				) : (
					[
						<Route exact path='/' component={Home} />,
						<Route path='/blog' component={Blog} />,
						<Route path='/projects' component={Projects} />,
						<Route path='/login' component={Login} />,
						<FootBar />
					]
				)}
			</Router>
		</Grommet>
	);
};

export default App;
