import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import {
	auth,
	db,
	logout,
	logInWithEmailAndPassword,
	signInWithGoogle,
} from '../../firebase/firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { useLocation, redirect } from 'react-router-dom';
import { useAlert } from '../../hooks';

const AuthContext = createContext({ isLoggedIn: null });

export const AuthProvider = ({ children }) => {
	const location = useLocation();
	const [user, loading] = useAuthState(auth);
	const [userData, setUserData] = useState(null);
	const [isLoadingData, setIsLoadingData] = useState(false);

	const { showAlert } = useAlert();

	const loginSuccessfulRedirect = () => {
		const origin = location.state?.from?.pathname || '/dashboard';
		redirect(origin);
	};

	useEffect(() => {
		if (loading || !user) {
			return;
		}

		const fetchUserName = async () => {
			try {
				setIsLoadingData(true);
				const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
				const doc = await getDocs(q);
				const data = doc.docs[0].data();
				setUserData(data);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoadingData(false);
			}
		};

		fetchUserName();
	}, [user, loading]);

	const handleLogin = async (email, password) => {
		if (email && password) {
			try {
				await logInWithEmailAndPassword(email, password);
				loginSuccessfulRedirect();
			} catch (error) {
				showAlert.error('There was an error with login, please try again.');
			}
		} else {
			try {
				await signInWithGoogle();
				loginSuccessfulRedirect();
			} catch (error) {
				showAlert.error('There was an error with login, please try again.');
			}
		}
	};

	const handleLogout = async () => {
		try {
			await logout();
			redirect('/login');
		} catch (error) {
			showAlert.error('There was an error with the logout, please try again.');
		}
	};

	const value = {
		onLogin: handleLogin,
		onLogout: handleLogout,
		userData: userData,
		isLoggingIn: loading,
		user: user,
		isLoggedIn: !!user,
		isUserDataLoading: isLoadingData,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const authData = useContext(AuthContext);
	return authData;
};
