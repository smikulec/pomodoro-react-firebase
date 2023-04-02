import styles from './Layout.module.scss';
import { NavBar } from '../NavBar';
import { Container } from '@mui/system';

export const Layout = ({ children }) => {
	return (
		<div className={styles.container}>
			<NavBar />
			<main className={styles.main}>
				<Container sx={{ pt: 8, pb: 5 }} maxWidth='xl'>
					{children}
				</Container>
			</main>
		</div>
	);
};
