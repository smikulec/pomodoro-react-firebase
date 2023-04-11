import { BrowserRouter as Router } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';
import { AuthProvider } from './contexts';
import { RoutesWrapper } from './routes';
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const theme = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					'&:hover': {
						backgroundColor: '#eebc7d',
					},
				},
			},
		},
	},
	palette: {
		primary: {
			light: '#FCC78630',
			main: '#FDC886',
			contrastText: '#000000',
			active: '#eebc7d',
			lightHover: '#e5b57930',
		},
		secondary: {
			main: '#D55448',
		},
		neutral: {
			main: '#D9D9D94A',
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
