import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Login from './pages/Login';

import './App.css';

// TODO: need to degign home page

function App() {
	return (
		<Router>
			<NavBar />
			<Route exact path='/' component={Home} />
			<Route path='/Blog' component={Blog} />
			<Route path='/projects' component={Projects} />
			<Route path='/login' component={Login} />
		</Router>
	);
}

export default App;
