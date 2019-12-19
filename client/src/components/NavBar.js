import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
	const pathname = window.location.pathname;
	const [activeItem, setActiveItem] = useState(pathname.split('/')[2]);
	const handleLinkClick = event => {
		const href = event.target.href.split('/');
		const path = href[href.length - 1];
		setActiveItem(path);
	};

	return <h1>Hello Nav Bar here</h1>;
}
