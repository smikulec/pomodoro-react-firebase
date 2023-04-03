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
import { Iconify } from '../Iconify/Iconify';
import { useAuth } from '../../contexts/AuthContext/AuthProvider';
import styles from './Login.module.scss';
import { Container } from '@mui/system';
import { useForm } from 'react-hook-form';

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
						padding: '80px 50px',
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
						Please enter your credentials to access your account.
					</Typography>

					<Box sx={{ maxWidth: '480px', margin: '0 auto' }}>
						<Stack fullWidth spacing={3}>
							<TextField
								name='email'
								label='Email address'
								{...register('email', {
									required: 'This is required!',
								})}
								error={errors?.email ? true : false}
							/>
							<TextField
								name='password'
								label='Password'
								type={showPassword ? 'text' : 'password'}
								{...register('password', {
									required: 'This is required!',
								})}
								error={errors?.password ? true : false}
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
							fullWidth
							spacing={3}
							direction='row'
							alignItems='center'
							sx={{ mt: 2, mb: 4 }}>
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
								':hover': { backgroundColor: '#eebc7d' },
							}}
							isLoading={isLoading}>
							Login
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
								or login with
							</Typography>
						</Divider>
						<Button
							size='large'
							color='inherit'
							variant='outlined'
							onClick={onLogin}
							sx={{
								textTransform: 'unset',
								mt: 4,
							}}>
							<Iconify icon='eva:google-fill' width={22} height={22} />
							<Typography as='p' sx={{ pl: 2, fontWeight: 600 }}>
								Google
							</Typography>
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
