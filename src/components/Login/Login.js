import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
	Button,
	Divider,
} from '@mui/material';
import { Iconify } from '../Iconify/Iconify';
import { useAuth } from '../../contexts/AuthContext/AuthProvider';
import styles from './Login.module.scss';

export function Login() {
	const [showPassword, setShowPassword] = useState(false);
	// const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();
	const { onLogin, user, isLoading } = useAuth();

	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
	});

	useEffect(() => {
		if (isLoading) {
			// maybe trigger a loading screen
			return;
		}
		if (user) navigate('/dashboard');
	}, [user, isLoading, navigate]);

	const handleInputChange = (event) => {
		setUserData((prevData) => {
			const newData = { ...prevData };
			return { ...newData, [event.target.name]: event.target.value };
		});
	};

	return (
		<div>
			<div className={styles.header}>
				<Typography variant='h1'>Welcome back</Typography>
				<Typography variant='body1'>
					Please enter your credentials to access your account.
				</Typography>
				<Typography variant='body1' sx={{ my: 5 }}>
					Don’t have an account? {''}
					<Link to='/register'>Register now.</Link>
				</Typography>
			</div>

			<div className={styles.container}>
				<Divider sx={{ my: 3 }}>
					<Typography variant='body2' sx={{ color: 'text.secondary' }}>
						OR
					</Typography>
				</Divider>

				<Stack fullWidth spacing={3}>
					<Button
						fullWidth
						size='large'
						color='inherit'
						variant='outlined'
						onClick={onLogin}>
						<Iconify
							icon='eva:google-fill'
							color='#DF3E30'
							width={22}
							height={22}
						/>
					</Button>

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
				</Stack>

				<Stack
					fullWidth
					spacing={3}
					direction='row'
					alignItems='center'
					justifyContent='flex-end'
					sx={{ my: 2 }}>
					<Link variant='subtitle2' underline='hover' to='/reset'>
						Forgot password?
					</Link>
				</Stack>

				<Button
					fullWidth
					size='large'
					type='submit'
					variant='contained'
					onClick={() => onLogin(userData.email, userData.password)}>
					Login
				</Button>
			</div>
		</div>
	);
}
