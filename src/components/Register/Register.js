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
import { useAuth } from '../../contexts/AuthContext/AuthProvider';
import {
	registerWithEmailAndPassword,
	signInWithGoogle,
} from '../../firebase/firebase';
import { Iconify } from '../Iconify/Iconify';
import { useForm } from 'react-hook-form';

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
	} = useForm();

	useEffect(() => {
		if (isLoading) return;
		if (user) navigate('/dashboard');
	}, [user, isLoading, navigate]);

	const handleRegister = (data) => {
		registerWithEmailAndPassword(data.name, data.email, data.password);
	};

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(handleRegister)}>
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
						Are you new here?
					</Typography>
					<Typography
						variant='body1'
						sx={{ my: 4, mx: 'auto', maxWidth: '360px', textAlign: 'center' }}>
						Register so you can track your tasks and the time you spend on them.
					</Typography>

					<div className={styles.container}>
						<Stack fullWidth spacing={3}>
							<TextField
								name='name'
								label='Full name'
								{...register('name', {
									required: 'This is required!',
								})}
								error={errors?.name ? true : false}
							/>
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
									Or register with
								</Typography>
							</Divider>
							<Button
								size='large'
								color='inherit'
								variant='outlined'
								onClick={signInWithGoogle}
								sx={{ textTransform: 'unset', mt: 4 }}>
								<Iconify icon='eva:google-fill' width={22} height={22} />
								<Typography as='p' sx={{ pl: 2, fontWeight: 600 }}>
									Google
								</Typography>
							</Button>
							<Typography variant='body1' sx={{ mt: 4, textAlign: 'center' }}>
								Already have an account?{' '}
								<Link to='/login' className={styles.link}>
									Login now
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
