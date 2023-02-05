import React from 'react';

import './Dashboard.scss';

import { NavBar } from '../NavBar';

export function Dashboard() {
	return (
		<main className='main'>
			<NavBar />
			<div className='dashboard'></div>
		</main>
	);
}
