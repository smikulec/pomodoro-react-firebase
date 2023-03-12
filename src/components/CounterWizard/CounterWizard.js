import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Iconify } from '../Iconify';

export const CounterWizard = ({ title, time, onLengthChange }) => {
	const handleButtonClick = (action) => {
		if (action === 'increment') {
			onLengthChange((prev) => prev + 1);
		} else if (action === 'decrement' && time > 0) {
			onLengthChange((prev) => prev - 1);
		}
	};

	return (
		<Box sx={{ mb: 3 }}>
			<Typography variant='subtitle1'>{title}</Typography>
			<Stack direction='row' alignItems='center'>
				<IconButton
					onClick={() => handleButtonClick('decrement')}
					color='primary'>
					<Iconify icon='mdi:minus' />
				</IconButton>
				<Typography variant='subtitle1' color='text.primary' sx={{ px: 2 }}>
					{time}
				</Typography>
				<IconButton
					onClick={() => handleButtonClick('increment')}
					color='primary'>
					<Iconify icon='mdi:plus' />
				</IconButton>
			</Stack>
		</Box>
	);
};
