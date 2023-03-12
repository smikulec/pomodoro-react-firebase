import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth, sendPasswordReset } from '../../firebase/firebase';
import styles from './Reset.module.scss';

export function Reset() {
	const [email, setEmail] = useState('');
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) return;
		if (user) navigate('/dashboard');
	}, [user, loading, navigate]);

	const handleInputChange = (event) => {
		setEmail(event.target.value);
	};

	return (
		<>
			<div className={styles.header}>
				<Typography variant='h1'>Forgot your password?</Typography>
				<Typography variant='body1' sx={{ my: 5 }}>
					Let's help you set a new one.
				</Typography>
			</div>
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
						onClick={() => sendPasswordReset(email)}>
						Send password reset email
					</Button>
				</Stack>

				<Typography variant='body1' sx={{ my: 5 }}>
					Already have an account? <Link to='/login'>Login</Link> now.
				</Typography>
			</div>
		</>
	);
}
