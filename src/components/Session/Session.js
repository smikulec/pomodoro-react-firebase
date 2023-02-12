import { Button, Typography, Stack, Input } from '@mui/material';
import { useState } from 'react';
import { NavBar } from '../NavBar';
import { useTodosList } from '../../hooks/useTodosList';

const CounterWizard = ({ title, time, onLengthChange }) => {
	const handleButtonClick = (action) => {
		if (action === 'increment') {
			onLengthChange((prev) => prev + 1);
		} else if (action === 'decrement' && time > 0) {
			onLengthChange((prev) => prev - 1);
		}
	};

	return (
		<div>
			<Typography variant='h5'>{title}</Typography>
			<Stack direction='row'>
				<Button onClick={() => handleButtonClick('decrement')}>-</Button>
				<span>{time}</span>
				<Button onClick={() => handleButtonClick('increment')}>+</Button>
			</Stack>
		</div>
	);
};

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
		};
		addTodo(data);
	};

	return (
		<>
			<NavBar />
			<main className='main'>
				<div>
					<Typography variant='h5'>
						Enter the task you want to work on
					</Typography>
					<Input onChange={handleInputChange} />
				</div>
				<div>
					<Typography variant='h4'>Customize your pomodoros</Typography>
					<CounterWizard
						title='Set your work length'
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

					<Button onClick={handleSaveClick}>Save your preferences</Button>
				</div>
			</main>
		</>
	);
};
