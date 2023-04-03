import {
	Button,
	Typography,
	Box,
	Paper,
	InputLabel,
	OutlinedInput,
	Divider,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { useTodosList } from '../../hooks/useTodosList';
import { CounterWizard } from '../CounterWizard';
import { useForm } from 'react-hook-form';

export const Session = () => {
	const [sessionLength, setSessionLength] = useState(25);
	const [shortBreakLength, setShortBreakLength] = useState(5);
	const [longBreakLength, setLongBreakLength] = useState(15);
	const [rounds, setRounds] = useState(4);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { addTodo } = useTodosList();

	const handleSaveData = (data) => {
		const preparedData = {
			taskName: data.taskName,
			rounds: rounds,
			sessionLength: sessionLength,
			shortBreakLength: shortBreakLength,
			longBreakLength: longBreakLength,
			totalTime: 0,
			isCompleted: false,
		};
		addTodo(preparedData);
	};

	return (
		<form onSubmit={handleSubmit(handleSaveData)}>
			<Typography variant='h4' sx={{ mb: 5, fontWeight: 700 }}>
				Create New Pomodoro
			</Typography>
			<Box maxWidth='sm' sx={{ mb: 6 }}>
				<Typography variant='h6'>What would you like to work on?</Typography>
			</Box>
			<Paper sx={{ maxWidth: '450px', borderRadius: '28px', padding: '40px' }}>
				<InputLabel sx={{ color: '#000000', fontWeight: 600, pb: 1 }}>
					Task name
				</InputLabel>
				<OutlinedInput
					fullWidth
					{...register('taskName', { required: true })}
					error={errors?.taskName ? true : false}
				/>
				<Divider
					sx={{
						width: '100px',
						borderColor: 'primary.main',
						borderBottomWidth: '4px',
						my: 4,
					}}
				/>
				<Stack>
					<CounterWizard
						title='Work session length'
						time={sessionLength}
						onLengthChange={setSessionLength}
					/>
					<CounterWizard
						title='Pomodoro rounds'
						time={rounds}
						onLengthChange={setRounds}
					/>
					<CounterWizard
						title='Short break length'
						time={shortBreakLength}
						onLengthChange={setShortBreakLength}
					/>
					<CounterWizard
						title='Long break length'
						time={longBreakLength}
						onLengthChange={setLongBreakLength}
					/>
				</Stack>
				<Button
					fullWidth
					variant='contained'
					type='submit'
					// onClick={handleSaveClick}
					sx={{
						textTransform: 'unset',
						fontWeight: 700,
						mt: 5,
						py: 1.5,
						':hover': { backgroundColor: '#eebc7d' },
					}}>
					Add new pomodoro
				</Button>
			</Paper>
		</form>
	);
};
