import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from '../firebase/firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useCurrentUser = () => {
	const [user, loading, error] = useAuthState(auth);
	const [userData, setUserData] = useState({});

	useEffect(() => {
		if (loading) return;
		if (!user) {
			console.log('there was an error');
		}

		const fetchUserName = async () => {
			try {
				const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
				const doc = await getDocs(q);
				const data = doc.docs[0].data();
				setUserData(data);
			} catch (err) {
				console.error(err);
				alert('An error occured while fetching user data');
			}
		};

		fetchUserName();
	}, [user, loading]);

	return {
		userData: userData,
		logoutUser: logout,
		isDataLoading: loading,
	};
};
