import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth, sendPasswordReset } from '../../firebase/firebase';
import styles from './Reset.module.scss';
import { useAlert } from '../../hooks/useAlert';
import { useForm } from 'react-hook-form';

export function Reset() {
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();
	const { showAlert } = useAlert();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (loading) return;
		if (user) navigate('/dashboard');
	}, [user, loading, navigate]);

	const handleResetClick = async (data) => {
		try {
			const response = await sendPasswordReset(data.email);
			showAlert.success(response.success);
		} catch (error) {
			showAlert.error(
				'There was an error, please check the email address you entered and try again.'
			);
		}
	};

	return (
		<div className={styles.wrapper}>
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
						padding: { xs: '40px 25px', sm: '60px 30px' },
						width: '100%',
					}}>
					<Typography
						variant='h4'
						sx={{ fontWeight: 700, textAlign: 'center' }}>
						Forgot your password?
					</Typography>
					<Typography
						variant='body1'
						sx={{ my: 4, mx: 'auto', maxWidth: '360px', textAlign: 'center' }}>
						Let's help you set a new one.
					</Typography>
					<div className={styles.container}>
						<form onSubmit={handleSubmit(handleResetClick)}>
							<Stack spacing={3}>
								<TextField
									name='email'
									label='Email address'
									{...register('email', {
										required: 'This field is required.',
									})}
									error={!!errors?.email}
									helperText={errors?.email ? errors?.email?.message : ' '}
								/>
								<Button
									fullWidth
									size='large'
									type='submit'
									variant='contained'
									sx={{
										textTransform: 'unset',
									}}>
									Send password reset email
								</Button>
							</Stack>
						</form>

						<Typography variant='body1' sx={{ my: 5 }}>
							Already have an account?{' '}
							<Link to='/login' className={styles.link}>
								Login now
							</Link>
							.
						</Typography>
					</div>
				</Box>
			</Container>
		</div>
	);
}
