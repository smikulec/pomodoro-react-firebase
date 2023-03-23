import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';
import { AuthProvider } from './contexts/AuthContext';
import { RoutesWrapper } from './components/Routes/Routes';

function App() {
	return (
		<>
			<NiceModal.Provider>
				<Router>
					<AuthProvider>
						<RoutesWrapper />
					</AuthProvider>
				</Router>
			</NiceModal.Provider>
		</>
	);
}

export default App;
