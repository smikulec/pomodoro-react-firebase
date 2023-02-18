import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import Button from '@mui/material/Button';
import styles from './NavBar.module.scss';
import { styled } from '@mui/material/styles';

const LogoutButton = styled(Button)({
	marginBottom: '30px',
});

export const NavBar = () => {
	const { userData, logoutUser } = useCurrentUser();

	return (
		<nav className={styles.nav}>
			<div className={styles.navTitle}>Logged in as {userData.name}</div>
			<ul className={styles.navList}>
				<li className={styles.navListItem}>
					<NavLink
						to='/dashboard'
						className={({ isActive }) =>
							isActive ? styles.navLinkActive : styles.navLink
						}>
						Dashboard
					</NavLink>
				</li>
				<li className={styles.navListItem}>
					<NavLink
						to='/timer'
						className={({ isActive }) =>
							isActive ? styles.navLinkActive : styles.navLink
						}>
						Timer
					</NavLink>
				</li>
				<li className={styles.navListItem}>
					<NavLink
						to='/new-pomodoro'
						className={({ isActive }) =>
							isActive ? styles.navLinkActive : styles.navLink
						}>
						New pomodoro
					</NavLink>
				</li>
				<li className={styles.navListItem}>
					<NavLink
						to='/statistics'
						className={({ isActive }) =>
							isActive ? styles.navLinkActive : styles.navLink
						}>
						Statistics
					</NavLink>
				</li>
				<li className={styles.navListItem}>
					<NavLink
						to='/settings'
						className={({ isActive }) =>
							isActive ? styles.navLinkActive : styles.navLink
						}>
						Settings
					</NavLink>
				</li>
			</ul>
			<div>
				<LogoutButton variant='contained' onClick={logoutUser}>
					Logout
				</LogoutButton>
			</div>
		</nav>
	);
};
