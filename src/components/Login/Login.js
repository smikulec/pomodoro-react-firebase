import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	auth,
	logInWithEmailAndPassword,
	signInWithGoogle,
} from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Login.scss';

export function Login() {
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
	});

	useEffect(() => {
		if (loading) {
			// maybe trigger a loading screen
			return;
		}
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
			<div className='login__header'>
				<h1>Welcome back</h1>
				<h2>Please enter your credentials to access your account.</h2>
			</div>
			<div className='login'>
				<div className='login__container'>
					<input
						type='text'
						className='login__textBox'
						value={userData.email}
						onChange={handleInputChange}
						placeholder='E-mail Address'
					/>
					<input
						type='password'
						className='login__textBox'
						value={userData.password}
						onChange={handleInputChange}
						placeholder='Password'
					/>
					<button
						className='login__btn'
						onClick={() =>
							logInWithEmailAndPassword(userData.email, userData.password)
						}>
						Login
					</button>
					<button
						className='login__btn login__google'
						onClick={signInWithGoogle}>
						Login with Google
					</button>
					<div>
						<Link to='/reset'>Forgot Password</Link>
					</div>
					<div>
						Don't have an account? <Link to='/register'>Register</Link> now.
					</div>
				</div>
			</div>
		</>
	);
}
