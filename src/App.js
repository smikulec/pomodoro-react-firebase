import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Register, Reset, Dashboard } from './components';
import { Timer } from './components/Timer';
import { Session } from './components/Session/Session';
import { Statistics } from './components/Statistics';
import NiceModal from '@ebay/nice-modal-react';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/PrivateRoute';
import { Layout } from './components/Layout';

function App() {
	return (
		<>
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
										<Layout>
											<Dashboard />
										</Layout>
									</ProtectedRoute>
								}
							/>
							<Route
								exact
								path='/timer'
								element={
									<ProtectedRoute>
										<Layout>
											<Timer />
										</Layout>
									</ProtectedRoute>
								}
							/>
							<Route
								exact
								path='/new-pomodoro'
								element={
									<ProtectedRoute>
										<Layout>
											<Session />
										</Layout>
									</ProtectedRoute>
								}
							/>
							<Route
								exact
								path='/statistics'
								element={
									<ProtectedRoute>
										<Layout>
											<Statistics />
										</Layout>
									</ProtectedRoute>
								}
							/>
							<Route
								exact
								path='/settings'
								element={
									<ProtectedRoute>
										<Layout>
											<Dashboard />
										</Layout>
									</ProtectedRoute>
								}
							/>
						</Routes>
					</AuthProvider>
				</Router>
			</NiceModal.Provider>
		</>
	);
}

export default App;
