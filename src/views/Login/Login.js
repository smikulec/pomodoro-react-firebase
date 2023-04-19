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
	Box,
} from '@mui/material';
import { Iconify } from '../../components';
import { useAuth } from '../../contexts';
import styles from './Login.module.scss';
import { Container } from '@mui/system';
import { useForm } from 'react-hook-form';
import signInWithGoogleImage from '../../assets/images/btn_google_signin_light_normal_web@2x.png';

export function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { onLogin, user, isLoading } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (isLoading) {
			return;
		}
		if (user) navigate('/dashboard');
	}, [user, isLoading, navigate]);

	const handleLogin = (data) => {
		onLogin(data.email, data.password);
	};

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleLogin)}>
			<Container
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
				}}>
				<Box
					sx={{
						borderRadius: '35px',
						backgroundColor: 'white',
						maxWidth: '550px',
						padding: { xs: '40px 25px', sm: '45px 30px' },
						width: '100%',
					}}>
					<Typography
						variant='h4'
						sx={{ fontWeight: 700, textAlign: 'center' }}>
						Pomodoro Login
					</Typography>
					<Typography
						variant='body1'
						sx={{
							my: 4,
							mx: 'auto',
							maxWidth: '360px',
							textAlign: 'center',
						}}>
						Log in to your account to get started.
					</Typography>

					<Box sx={{ maxWidth: '480px', margin: '0 auto' }}>
						<Stack spacing={2}>
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
						</Stack>

						<Stack
							spacing={3}
							direction='row'
							alignItems='center'
							sx={{ pt: 1, pb: 4 }}>
							<Typography variant='body1'>
								<Link to='/reset' className={styles.link}>
									Forgot password?
								</Link>
							</Typography>
						</Stack>

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
							}}>
							Log in
						</Button>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<Divider sx={{ mt: 4, width: '170px' }}>
							<Typography variant='body2' sx={{ color: 'text.secondary' }}>
								or log in with
							</Typography>
						</Divider>
						<Button
							onClick={onLogin}
							sx={{
								padding: 0,
								mt: 4,
							}}>
							<img
								className={styles.loginButtonImage}
								src={signInWithGoogleImage}
								alt='google logo with sign in with google text'
							/>
						</Button>
						<Typography variant='body1' sx={{ mt: 4, textAlign: 'center' }}>
							Don’t have an account? {''}
							<Link to='/register' className={styles.link}>
								Register now.
							</Link>
						</Typography>
					</Box>
				</Box>
			</Container>
		</form>
	);
}
