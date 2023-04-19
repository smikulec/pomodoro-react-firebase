import { IconButton, Stack, TextField, Typography } from '@mui/material';
import { Iconify } from '../Iconify';

export const CounterWizard = ({ title, time, onLengthChange }) => {
	const handleButtonClick = (action) => {
		if (action === 'increment') {
			onLengthChange((prev) => prev + 1);
		} else if (action === 'decrement' && time > 1) {
			onLengthChange((prev) => prev - 1);
		}
	};

	const handleInputChange = (event) => {
		if (!isNaN(event.target.value)) {
			onLengthChange(event.target.value);
		}
	};

	return (
		<Stack
			sx={{ mb: 3, maxWidth: '350px' }}
			direction='row'
			alignItems='center'
			justifyContent='space-between'>
			<Typography variant='subtitle1' fontWeight={700} sx={{ pb: 1, pr: 2 }}>
				{title} (min)
			</Typography>
			<Stack
				direction='row'
				alignItems='center'
				sx={{
					padding: '6px',
					backgroundColor: '#FFFFFF',
					border: '1px solid #CBD5E1',
					borderRadius: '6px',
					width: { xs: '140px', md: '160px' },
					flexShrink: 0,
					flexGrow: 0,
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
				<TextField
					value={time}
					variant='standard'
					onChange={handleInputChange}
					sx={{ borderBottom: 'none' }}
					InputProps={{
						disableUnderline: true,
						sx: {
							px: 1,
							fontWeight: 600,

							'& input': {
								textAlign: 'center',
								'&::placeholder': {
									textAlign: 'center',
								},
							},
						},
					}}
				/>
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
