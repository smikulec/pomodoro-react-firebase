import styles from './Layout.module.scss';
import { NavBar } from '../NavBar';
import { Container } from '@mui/system';

export const Layout = ({ children }) => {
	return (
		<div className={styles.container}>
			<NavBar />
			<main>
				<Container sx={{ pt: 10 }} maxWidth='xl'>
					{children}
				</Container>
			</main>
		</div>
	);
};
