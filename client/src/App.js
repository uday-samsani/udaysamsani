import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import Login from './pages/Login';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
	return (
		<Container>
			<Router>
				<NavBar />
				<Route exact path='/' component={Home} />
				<Route path='/Blog' component={Blog} />
				<Route path='/about' component={About} />
				<Route path='/login' component={Login} />
			</Router>
		</Container>
	);
}

export default App;
