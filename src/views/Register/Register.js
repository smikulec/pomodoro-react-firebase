import {
	Box,
	Button,
	Container,
	Divider,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts';
import {
	registerWithEmailAndPassword,
	signInWithGoogle,
} from '../../firebase/firebase';
import { Iconify } from '../../components';
import { useForm } from 'react-hook-form';

import signInWithGoogleImage from '../../assets/images/btn_google_signin_light_normal_web@2x.png';

import styles from './Register.module.scss';

export function Register() {
	// TODO: handle error state
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const { user, isLoading } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	useEffect(() => {
		if (isLoading) return;
		if (user) navigate('/dashboard');
	}, [user, isLoading, navigate]);

	const handleRegister = (data) => {
		registerWithEmailAndPassword(data.name, data.email, data.password);
	};

	const password = watch('password');

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleRegister)}>
			<Container
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: '50px',
					marginBottom: '50px',
				}}>
				<Box
					sx={{
						borderRadius: '35px',
						backgroundColor: 'white',
						maxWidth: '550px',
						padding: { xs: '40px 25px', sm: '40px 30px' },
						width: '100%',
					}}>
					<Typography
						variant='h4'
						sx={{ fontWeight: 700, textAlign: 'center' }}>
						Are you new here?
					</Typography>
					<Typography
						variant='body1'
						sx={{ my: 4, mx: 'auto', maxWidth: '360px', textAlign: 'center' }}>
						Register so you can track your tasks and the time you spend on them.
					</Typography>

					<div className={styles.container}>
						<Stack spacing={2}>
							<TextField
								name='name'
								label='Full name'
								{...register('name', {
									required: 'This field is required.',
								})}
								error={!!errors?.name}
								helperText={errors?.name ? errors?.name?.message : ' '}
							/>
							<TextField
								name='email'
								label='Email address'
								{...register('email', {
									required: 'This field is required.',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Invalid email address',
									},
								})}
								error={!!errors.email}
								helperText={errors?.email ? errors?.email?.message : ' '}
							/>
							<TextField
								name='password'
								label='Password'
								type={showPassword ? 'text' : 'password'}
								{...register('password', {
									required: 'This field is required.',
								})}
								error={!!errors.password}
								helperText={errors?.password ? errors?.password?.message : ' '}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												onClick={() => setShowPassword(!showPassword)}
												edge='end'>
												<Iconify
													icon={
														showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
													}
												/>
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							<TextField
								name='repeatPassword'
								label='Repeat password'
								type={showPassword ? 'text' : 'password'}
								{...register('repeatPassword', {
									required: 'This field is required.',
									validate: (value) =>
										value === password || 'Passwords do not match.',
								})}
								error={!!errors.repeatPassword}
								helperText={
									errors?.repeatPassword ? errors?.repeatPassword?.message : ' '
								}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												onClick={() => setShowPassword(!showPassword)}
												edge='end'>
												<Iconify
													icon={
														showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
													}
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
								sx={{
									py: 1.5,
									textTransform: 'unset',
									fontWeight: 600,
									letterSpacing: 1.5,
								}}
								onClick={handleRegister}>
								Register
							</Button>
						</Stack>

						<div className={styles.sectionContainer}>
							<Divider sx={{ mt: 4, width: '170px' }}>
								<Typography variant='body2' sx={{ color: 'text.secondary' }}>
									or register with
								</Typography>
							</Divider>
							<Button
								size='large'
								onClick={signInWithGoogle}
								sx={{ padding: 0, mt: 4 }}>
								<img
									className={styles.registerButtonImage}
									src={signInWithGoogleImage}
									alt='google logo with sign in with google text'
								/>
							</Button>
							<Typography variant='body1' sx={{ mt: 4, textAlign: 'center' }}>
								Already have an account?{' '}
								<Link to='/login' className={styles.link}>
									Log in now
								</Link>
								.
							</Typography>
						</div>
					</div>
				</Box>
			</Container>
		</form>
	);
}
