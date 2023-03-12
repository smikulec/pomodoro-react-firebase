import { Button, Typography, Input, Box } from '@mui/material';
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
			<Typography variant='h4' sx={{ mb: 5 }}>
				What would you like to work on?
			</Typography>
			<Box maxWidth='sm' sx={{ mb: 4 }}>
				<Typography variant='h6'>Enter the task name</Typography>
				<Input onChange={handleInputChange} fullWidth />
			</Box>
			<Box>
				<Typography variant='h6' sx={{ mb: 3 }}>
					Customize your pomodoros
				</Typography>
				<CounterWizard
					title='Set your work session length'
					time={sessionLength}
					onLengthChange={setSessionLength}
				/>
				<CounterWizard
					title='Set your short break length'
					time={shortBreakLength}
					onLengthChange={setShortBreakLength}
				/>
				<CounterWizard
					title='Set your long break length'
					time={longBreakLength}
					onLengthChange={setLongBreakLength}
				/>
				<CounterWizard
					title='Set the number of pomodoro rounds before the long break'
					time={rounds}
					onLengthChange={setRounds}
				/>
				<Button variant='contained' onClick={handleSaveClick}>
					Create new pomodoro
				</Button>
			</Box>
		</main>
	);
};
