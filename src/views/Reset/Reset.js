import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth, sendPasswordReset } from '../../firebase/firebase';
import styles from './Reset.module.scss';

export function Reset() {
	const [email, setEmail] = useState('');
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) return;
		if (user) navigate('/dashboard');
	}, [user, loading, navigate]);

	const handleInputChange = (event) => {
		setEmail(event.target.value);
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
						padding: { xs: '40px 25px', sm: '80px 50px' },
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
						<Stack fullWidth spacing={3}>
							<TextField
								name='email'
								label='Email address'
								onChange={handleInputChange}
							/>
							<Button
								fullWidth
								size='large'
								type='submit'
								variant='contained'
								sx={{
									textTransform: 'unset',
								}}
								onClick={() => sendPasswordReset(email)}>
								Send password reset email
							</Button>
						</Stack>

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
