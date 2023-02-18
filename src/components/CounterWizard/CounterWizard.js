import { Button, Stack, Typography } from '@mui/material';

export const CounterWizard = ({ title, time, onLengthChange }) => {
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
