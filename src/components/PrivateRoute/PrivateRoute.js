import { useAuth } from '../../contexts/AuthContext';

import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
	const { user } = useAuth();
	const location = useLocation();

	if (!user) {
		return <Navigate to='/login' replace state={{ from: location }} />;
	}

	return children;
};
