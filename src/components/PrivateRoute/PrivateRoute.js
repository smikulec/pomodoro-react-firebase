import { useAuth } from '../../contexts/AuthContext';

import { Navigate, useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export const ProtectedRoute = ({ children }) => {
	const { user, isUserDataLoading } = useAuth();
	const location = useLocation();

	if (isUserDataLoading) {
		<CircularProgress />;
	}

	if (!user && !isUserDataLoading) {
		return <Navigate to='/login' replace state={{ from: location }} />;
	}

	return children;
};
