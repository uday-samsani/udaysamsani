import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
	const pathname = window.location.pathname;
	const path = pathname === '/' ? 'home' : pathname.substr(1);

	const [activeItem, setActiveItem] = useState(path);
	const handleItemClick = (e, { name }) => setActiveItem(name);
	return (
		<Menu text size='massive' color='teal'>
			<Menu.Item
				name='Home'
				active={activeItem === 'home'}
				onClick={handleItemClick}
				as={Link}
				to={'/'}
			/>
			<Menu.Item
				name='Blog'
				active={activeItem === 'messages'}
				onClick={handleItemClick}
				as={Link}
				to={'/blog'}
			/>
			<Menu.Item
				name='About'
				active={activeItem === 'friends'}
				onClick={handleItemClick}
				as={Link}
				to={'/about'}
			/>
			<Menu.Menu position='right'>
				<Menu.Item
					name='Login'
					active={activeItem === 'logout'}
					onClick={handleItemClick}
					as={Link}
					to={'/login'}
				/>
			</Menu.Menu>
		</Menu>
	);
};

export default NavBar;
