import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';
import { AuthProvider } from './contexts/AuthContext';
import { RoutesWrapper } from './components/Routes/Routes';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#FDC886',
		},
		secondary: {
			main: '#D55448',
		},
	},
	typography: {
		fontFamily: ['Poppins', 'sans-serif'].join(','),
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<NiceModal.Provider>
				<Router>
					<AuthProvider>
						<RoutesWrapper />
					</AuthProvider>
				</Router>
			</NiceModal.Provider>
		</ThemeProvider>
	);
}

export default App;
