import { initializeApp } from 'firebase/app';

import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from 'firebase/auth';
import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const addUserToUsersCollection = async (user) => {
	try {
		const q = query(collection(db, 'users'), where('uid', '==', user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await addDoc(collection(db, 'users'), {
				uid: user.uid,
				name: user.displayName,
				authProvider: 'google',
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
	}
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await signInWithPopup(auth, googleProvider);
			const user = res.user;
			await addUserToUsersCollection(user);
			resolve({ success: 'Signed in with Google in successfully' });
		} catch (error) {
			reject(error);
		}
	});
};

const logInWithEmailAndPassword = (email, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			resolve({ success: 'Logged in successfully!' });
		} catch (error) {
			reject(error);
		}
	});
};

const registerWithEmailAndPassword = async (name, email, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			const user = res.user;
			await addDoc(collection(db, 'users'), {
				uid: user.uid,
				name,
				authProvider: 'local',
				email,
			});
			resolve({ success: 'Registered successfully!' });
		} catch (error) {
			reject(error);
		}
	});
};

const sendPasswordReset = (email) => {
	return new Promise(async (resolve, reject) => {
		try {
			await sendPasswordResetEmail(auth, email);
			resolve({ success: 'Password reset link sent!' });
		} catch (error) {
			reject(error);
		}
	});
};

const logout = () => {
	return new Promise(async (resolve, reject) => {
		try {
			await signOut(auth);
			resolve({ success: 'Logout successful' });
		} catch (error) {
			reject(error);
		}
	});
};

export {
	auth,
	db,
	signInWithGoogle,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
};
