import React, { useState } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './css/NavBar.css';

const NavBar = () => {
	const pathname = window.location.pathname;
	const path = pathname === '/' ? 'home' : pathname.substr(1);

	const [activeItem, setActiveItem] = useState(path);
	console.log(path);
	const handleItemClick = (e, { name }) => setActiveItem(name);
	return (
		<Container textAlign='center'>
			<Menu text size='massive' color='teal' className='NavBar'>
				<Menu.Menu position='left'>
					<Menu.Item
						name='home'
						active={activeItem === 'home'}
						onClick={handleItemClick}
						as={Link}
						to={'/'}
					>
						<p className='NavItem'>Home</p>
					</Menu.Item>
					<Menu.Item
						name='blog'
						active={activeItem === 'blog'}
						onClick={handleItemClick}
						as={Link}
						to={'/blog'}
					>
						<p className='NavItem'>Blog</p>
					</Menu.Item>
				</Menu.Menu>
				<Menu.Item className='NavItem'>
					<p className='NavTitle'>UDAY SAMSANI</p>
				</Menu.Item>
				<Menu.Menu position='left'>
					<Menu.Item
						name='about'
						active={activeItem === 'about'}
						onClick={handleItemClick}
						as={Link}
						to={'/about'}
					>
						<p className='NavItem'>About</p>
					</Menu.Item>

					<Menu.Item
						name='login'
						active={activeItem === 'login'}
						onClick={handleItemClick}
						as={Link}
						to={'/login'}
					>
						<p className='NavItem'>Login</p>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		</Container>
	);
};

export default NavBar;
