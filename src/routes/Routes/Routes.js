import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts';
import {
	Dashboard,
	Login,
	Register,
	Reset,
	Session,
	Statistics,
	Timer,
} from '../../views';
import { ProtectedRoute } from '../PrivateRoute';
import { Loader, Layout } from '../../components';

export const RoutesWrapper = () => {
	const { isUserDataLoading, isLoggedIn, isLoggingIn, userData } = useAuth();
	const isLoading = isUserDataLoading || isLoggingIn;

	if (isLoading && !isLoggedIn && !userData) {
		return <Loader />;
	}

	return (
		<Routes>
			<Route
				exact
				path='/'
				element={
					isLoggedIn ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
				}
			/>
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
		</Routes>
	);
};
