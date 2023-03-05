import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Register, Reset, Dashboard } from './components';
import { Timer } from './components/Timer';
import { Session } from './components/Session/Session';
import { Statistics } from './components/Statistics';
import NiceModal from '@ebay/nice-modal-react';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/PrivateRoute';

function App() {
	return (
		<div className='app'>
			<NiceModal.Provider>
				<Router>
					<AuthProvider>
						<Routes>
							<Route exact path='/login' element={<Login />} />
							<Route exact path='/register' element={<Register />} />
							<Route exact path='/reset' element={<Reset />} />
							<Route
								exact
								path='/dashboard'
								element={
									<ProtectedRoute>
										<Dashboard />
									</ProtectedRoute>
								}
							/>
							<Route
								exact
								path='/timer'
								element={
									<ProtectedRoute>
										<Timer />
									</ProtectedRoute>
								}
							/>
							<Route
								exact
								path='/new-pomodoro'
								element={
									<ProtectedRoute>
										<Session />
									</ProtectedRoute>
								}
							/>
							<Route
								exact
								path='/statistics'
								element={
									<ProtectedRoute>
										<Statistics />
									</ProtectedRoute>
								}
							/>
							<Route
								exact
								path='/settings'
								element={
									<ProtectedRoute>
										<Dashboard />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</AuthProvider>
				</Router>
			</NiceModal.Provider>
		</div>
	);
}

export default App;
