import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';
import { AuthProvider } from './contexts/AuthContext';
import { RoutesWrapper } from './components/Routes/Routes';
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
			<ToastContainer
				position='bottom-right'
				hideProgressBar={true}
				autoClose={2000}
				bodyClassName='custom-toast-body'
			/>
		</ThemeProvider>
	);
}

export default App;
