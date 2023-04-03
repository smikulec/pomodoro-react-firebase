import { IconButton, Stack, Typography } from '@mui/material';
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
		<Stack
			sx={{ mb: 3, maxWidth: '350px' }}
			direction='row'
			alignItems='center'
			justifyContent='space-between'>
			<Typography variant='subtitle1' fontWeight={700} sx={{ pb: 1, pr: 2 }}>
				{title}:
			</Typography>
			<Stack
				direction='row'
				alignItems='center'
				sx={{
					padding: '6px',
					backgroundColor: '#FFFFFF',
					border: '1px solid #CBD5E1',
					borderRadius: '6px',
					width: 'fit-content',
				}}>
				<IconButton
					onClick={() => handleButtonClick('decrement')}
					sx={{
						color: 'primary.contrastText',
						borderRadius: '6px',
						backgroundColor: 'primary.main',
						':hover': { backgroundColor: 'primary.active' },
					}}>
					<Iconify icon='mdi:minus' />
				</IconButton>
				<Typography
					variant='subtitle1'
					color='text.primary'
					sx={{
						px: 2,
						fontWeight: 600,
						minWidth: '20px',
						textAlign: 'center',
					}}>
					{time}
				</Typography>
				<IconButton
					onClick={() => handleButtonClick('increment')}
					sx={{
						color: 'primary.contrastText',
						borderRadius: '6px',
						backgroundColor: 'primary.main',
						':hover': { backgroundColor: 'primary.active' },
					}}>
					<Iconify icon='mdi:plus' />
				</IconButton>
			</Stack>
		</Stack>
	);
};
