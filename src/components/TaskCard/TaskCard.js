import { Card, IconButton, MenuItem, Popover, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import timeIcon from '../../assets/icons/time-icon.svg';
import { useState } from 'react';
import { Iconify } from '../Iconify';
import { useEditTaskModal } from '../EditTaskModal/useEditTaskModal';
import { Link } from 'react-router-dom';

import styles from './TaskCard.module.scss';
import { useTodosList } from '../../hooks/useTodosList';

function IconRenderer({ number }) {
	const icons = Array.from({ length: number }).map((_, i) => (
		<img src={timeIcon} alt='hourglass icon' key={i} />
	));

	return <>{icons}</>;
}

export const TaskCard = ({ taskData, onDataChange }) => {
	const [open, setOpen] = useState(null);

	const editTaskModal = useEditTaskModal();

	const { updateTodo, deleteTodo, refreshTodoList } = useTodosList();

	const handleOpenMenu = (event) => {
		setOpen(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setOpen(null);
	};

	const handleMarkComplete = () => {
		const data = {
			...taskData,
			isCompleted: true,
		};
		updateTodo(data);
		refreshTodoList();
		handleCloseMenu();
	};

	const handleEdit = () => {
		handleCloseMenu();
		editTaskModal.showModal({ taskData, onDataChange });
	};

	const handleDelete = () => {
		deleteTodo(taskData.id);
		refreshTodoList();
		handleCloseMenu();
	};

	const pomodoroNumber = Math.round(
		taskData.totalTime / taskData.sessionLength
	);

	return (
		<Card sx={{ maxWidth: '700px', padding: '10px 20px', margin: '10px 0' }}>
			<Stack direction='row' alignItems='center' spacing={2}>
				<Box sx={{ minWidth: 240, flexGrow: 1 }}>
					<Typography color='inherit' variant='subtitle1'>
						<Link
							to='/timer'
							state={{ data: taskData }}
							className={styles.link}>
							{taskData?.taskName}
						</Link>
					</Typography>
				</Box>

				<Box>
					<IconRenderer number={pomodoroNumber} />
				</Box>
				<Box>
					<IconButton
						size='large'
						color='inherit'
						sx={{ opacity: 0.48 }}
						onClick={handleOpenMenu}>
						<Iconify icon={'eva:more-vertical-fill'} />
					</IconButton>

					<Popover
						open={Boolean(open)}
						anchorEl={open}
						onClose={handleCloseMenu}
						anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
						transformOrigin={{ vertical: 'top', horizontal: 'right' }}
						PaperProps={{
							sx: {
								p: 1,
								'& .MuiMenuItem-root': {
									px: 1,
									typography: 'body2',
									borderRadius: 0.75,
								},
							},
						}}>
						<MenuItem onClick={handleMarkComplete}>
							<Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ mr: 2 }} />
							Mark complete
						</MenuItem>

						<MenuItem onClick={handleEdit}>
							<Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
							Edit
						</MenuItem>

						<MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
							<Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
							Delete
						</MenuItem>
					</Popover>
				</Box>
			</Stack>
		</Card>
	);
};
