import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import {
	auth,
	registerWithEmailAndPassword,
	signInWithGoogle,
} from '../../firebase/firebase';

import './Register.scss';

export function Register() {
	const [user, loading, error] = useAuthState(auth);
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const navigate = useNavigate();

	const register = () => {
		registerWithEmailAndPassword(
			userData.name,
			userData.email,
			userData.password
		);
	};

	useEffect(() => {
		if (loading) return;
		if (user) navigate('/dashboard');
	}, [user, loading, navigate]);

	const handleInputChange = (event) => {
		setUserData((prevData) => {
			const newData = { ...prevData };
			return { ...newData, [event.target.name]: event.target.value };
		});
	};

	return (
		<>
			<div className='register__header'>
				<h1>Are you new here?</h1>
				<h2>Register so you can track your tasks and pomodoros.</h2>
			</div>
			<div className='register'>
				<div className='register__container'>
					<input
						type='text'
						className='register__textBox'
						name='name'
						value={userData.name}
						onChange={handleInputChange}
						placeholder='Full Name'
					/>
					<input
						type='text'
						className='register__textBox'
						name='email'
						value={userData.email}
						onChange={handleInputChange}
						placeholder='E-mail Address'
					/>
					<input
						type='password'
						className='register__textBox'
						name='password'
						value={userData.password}
						onChange={handleInputChange}
						placeholder='Password'
					/>
					<button className='register__btn' onClick={register}>
						Register
					</button>
					<button
						className='register__btn register__google'
						onClick={signInWithGoogle}>
						Register with Google
					</button>

					<div>
						Already have an account? <Link to='/'>Login</Link> now.
					</div>
				</div>
			</div>
		</>
	);
}
