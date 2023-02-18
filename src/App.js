// import logo from './logo.svg';
// import './App.css';
// import { useState, useEffect } from 'react';
// import { db } from './firebase-config';
// import {
// 	collection,
// 	getDocs,
// 	addDoc,
// 	updateDoc,
// 	deleteDoc,
// 	doc,
// } from 'firebase/firestore';

// const usersCollectionRef = collection(db, 'users');

// function App() {
// 	const [users, setUsers] = useState([]);
// 	const [newName, setNewName] = useState('');

// 	const createUser = async () => {
// 		await addDoc(usersCollectionRef, {});
// 	};

// 	const updateUser = async (id, age) => {
// 		const userDoc = doc(db, 'users', id);
// 	};

// 	const deleteUser = async (id) => {};

// 	useEffect(() => {
// 		const getUsers = async () => {
// 			const data = await getDocs(usersCollectionRef);
// 			setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
// 		};

// 		getUsers();
// 	}, []);

// 	console.log(users);

// 	return <div className='App'></div>;
// }

// export default App;

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Register, Reset, Dashboard } from './components';
import { Timer } from './components/Timer';
import { Session } from './components/Session/Session';
import { Statistics } from './components/Statistics';

function App() {
	return (
		<div className='app'>
			<Router>
				<Routes>
					<Route exact path='/register' element={<Register />} />
					<Route exact path='/reset' element={<Reset />} />
					<Route exact path='/dashboard' element={<Dashboard />} />
					<Route exact path='/timer' element={<Timer />} />
					<Route exact path='/new-pomodoro' element={<Session />} />
					<Route exact path='/statistics' element={<Statistics />} />
					<Route exact path='/settings' element={<Dashboard />} />
					<Route exact path='/' element={<Login />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
