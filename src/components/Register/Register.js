import {
	Button,
	Divider,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthProvider';
import {
	registerWithEmailAndPassword,
	signInWithGoogle,
} from '../../firebase/firebase';
import { Iconify } from '../Iconify/Iconify';

import styles from './Register.module.scss';

export function Register() {
	// TODO: handle error state
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (isLoading) return;
		if (user) navigate('/dashboard');
	}, [user, isLoading, navigate]);

	const handleInputChange = (event) => {
		setUserData((prevData) => {
			const newData = { ...prevData };
			return { ...newData, [event.target.name]: event.target.value };
		});
	};

	const handleRegister = () => {
		registerWithEmailAndPassword(
			userData.name,
			userData.email,
			userData.password
		);
	};

	return (
		<>
			<div className={styles.header}>
				<Typography variant='h1'>Are you new here?</Typography>
				<Typography variant='body1' sx={{ my: 5 }}>
					Register so you can track your tasks and pomodoros.
				</Typography>
			</div>

			<div className={styles.container}>
				<Stack fullWidth spacing={3}>
					<Button
						fullWidth
						size='large'
						color='inherit'
						variant='outlined'
						onClick={signInWithGoogle}>
						Register with
						<Iconify
							icon='eva:google-fill'
							color='#DF3E30'
							width={22}
							height={22}
						/>
					</Button>
					<Divider sx={{ my: 3 }}>
						<Typography variant='body2' sx={{ color: 'text.secondary' }}>
							OR
						</Typography>
					</Divider>
					<TextField
						name='name'
						label='Full name'
						onChange={handleInputChange}
					/>
					<TextField
						name='email'
						label='Email address'
						onChange={handleInputChange}
					/>
					<TextField
						name='password'
						label='Password'
						type={showPassword ? 'text' : 'password'}
						onChange={handleInputChange}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={() => setShowPassword(!showPassword)}
										edge='end'>
										<Iconify
											icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
										/>
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Button
						fullWidth
						size='large'
						type='submit'
						variant='contained'
						onClick={handleRegister}>
						Register
					</Button>
				</Stack>

				<Typography variant='body1' sx={{ my: 5 }}>
					Already have an account? <Link to='/login'>Login</Link> now.
				</Typography>
			</div>
		</>
	);
}
