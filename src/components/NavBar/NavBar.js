import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import './NavBar.scss';

export const NavBar = () => {
	const { userData, logoutUser } = useCurrentUser();

	return (
		<nav className='nav'>
			<div className='nav__title'>Logged in as {userData.name}</div>
			<ul className='nav__list'>
				<li className='nav__list-item'>
					<NavLink
						to='/dashboard'
						className={({ isActive }) =>
							isActive ? 'nav__link--active' : 'nav__link'
						}>
						Dashboard
					</NavLink>
				</li>
				<li className='nav__list-item'>
					<NavLink
						to='/timer'
						className={({ isActive }) =>
							isActive ? 'nav__link--active' : 'nav__link'
						}>
						Timer
					</NavLink>
				</li>
				<li className='nav__list-item'>
					<NavLink
						to='/new-pomodoro'
						className={({ isActive }) =>
							isActive ? 'nav__link--active' : 'nav__link'
						}>
						New pomodoro
					</NavLink>
				</li>
				<li className='nav__list-item'>
					<NavLink
						to='/new-task'
						className={({ isActive }) =>
							isActive ? 'nav__link--active' : 'nav__link'
						}>
						New task
					</NavLink>
				</li>
				<li className='nav__list-item'>
					<NavLink
						to='/statistics'
						className={({ isActive }) =>
							isActive ? 'nav__link--active' : 'nav__link'
						}>
						Statistics
					</NavLink>
				</li>
				<li className='nav__list-item'>
					<NavLink
						to='/settings'
						className={({ isActive }) =>
							isActive ? 'nav__link--active' : 'nav__link'
						}>
						Settings
					</NavLink>
				</li>
			</ul>
			<div>
				<button className='nav__btn' onClick={logoutUser}>
					Logout
				</button>
			</div>
		</nav>
	);
};
