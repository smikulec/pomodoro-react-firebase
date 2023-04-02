import {
	Button,
	Typography,
	Input,
	Box,
	Paper,
	InputLabel,
	OutlinedInput,
	Divider,
	Grid,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { useTodosList } from '../../hooks/useTodosList';
import { CounterWizard } from '../CounterWizard';

export const Session = () => {
	const [sessionLength, setSessionLength] = useState(25);
	const [shortBreakLength, setShortBreakLength] = useState(5);
	const [longBreakLength, setLongBreakLength] = useState(15);
	const [rounds, setRounds] = useState(4);
	const [taskName, setTaskName] = useState('');

	const { addTodo } = useTodosList();

	const handleInputChange = (event) => {
		setTaskName(event.target.value);
	};

	const handleSaveClick = (e) => {
		e.preventDefault();
		const data = {
			taskName: taskName,
			rounds: rounds,
			sessionLength: sessionLength,
			shortBreakLength: shortBreakLength,
			longBreakLength: longBreakLength,
			totalTime: 0,
			isCompleted: false,
		};
		addTodo(data);
	};

	return (
		<main className='main'>
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
				<OutlinedInput fullWidth onChange={handleInputChange} />
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
					onClick={handleSaveClick}
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
		</main>
	);
};
