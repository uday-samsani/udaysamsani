import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container, Responsive, Icon, Sidebar } from 'semantic-ui-react';

import './css/NavBar.css';

const NavBar = () => {
	const pathname = window.location.pathname;
	const path = pathname === '/' ? 'home' : pathname.substr(1);

	const [activeItem, setActiveItem] = useState(path);
	const [sideBar, setSideBar] = useState(false);

	const handleItemClick = (e, { name }) => {
		setActiveItem(name);
		if (sideBar) {
			setSideBar(false);
		}
	};
	const handleIconClick = (e, data) => setSideBar(!sideBar);
	return (
		<>
			<Sidebar
				as={Menu}
				animation='overlay'
				icon='labeled'
				inverted
				onHide={() => setSideBar(false)}
				vertical
				visible={sideBar}
				width='thin'
			>
				<Menu.Item onClick={handleIconClick}>
					<p className='NavCloseMobile'>
						<Icon className='NavIconMobile' name='close' fitted />{' '}
						Close
					</p>
				</Menu.Item>
				<Menu.Item
					name='home'
					active={activeItem === 'home'}
					onClick={handleItemClick}
					as={Link}
					to={'/'}
				>
					<p className='NavItemMobile'>Home</p>
				</Menu.Item>
				<Menu.Item
					name='blog'
					active={activeItem === 'blog'}
					onClick={handleItemClick}
					as={Link}
					to={'/blog'}
				>
					<p className='NavItemMobile'>Blog</p>
				</Menu.Item>
				<Menu.Item
					name='about'
					active={activeItem === 'about'}
					onClick={handleItemClick}
					as={Link}
					to={'/about'}
				>
					<p className='NavItemMobile'>About</p>
				</Menu.Item>

				<Menu.Item
					name='login'
					active={activeItem === 'login'}
					onClick={handleItemClick}
					as={Link}
					to={'/login'}
				>
					<p className='NavItemMobile'>Login</p>
				</Menu.Item>
			</Sidebar>
			<Container textAlign='center'>
				<Menu text size='massive' color='teal' className='NavBar'>
					<Responsive
						as={Menu.Menu}
						position='left'
						minWidth={Responsive.onlyMobile.maxWidth}
					>
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
					</Responsive>
					<Menu.Menu>
						<Responsive
							as={Menu.Item}
							position='left'
							maxWidth={Responsive.onlyMobile.maxWidth}
							onClick={handleIconClick}
						>
							<Icon
								className='NavIcon'
								name='bars'
								size='large'
								// fitted
							/>
						</Responsive>
						<Menu.Item className='NavItem' position='left'>
							<p className='NavTitle'>UDAY SAMSANI</p>
						</Menu.Item>
					</Menu.Menu>
					<Responsive
						as={Menu.Menu}
						position='left'
						minWidth={Responsive.onlyMobile.maxWidth}
					>
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
					</Responsive>
				</Menu>
			</Container>
		</>
	);
};

export default NavBar;
