import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { TaskCard } from '../TaskCard';
import { useTodosList } from '../../hooks/useTodosList';

import { useAuth } from '../../contexts/AuthContext/AuthProvider';
import { Iconify } from '../Iconify';
import { Loader } from '../Loader/Loader';

export function Dashboard() {
	const { userData } = useAuth();
	const { todoList, refreshTodoList, isLoading } = useTodosList();

	const uncompletedTasks = todoList.filter((todo) => !todo.isCompleted);

	return (
		<Box sx={{ maxWidth: '690px' }}>
			<Typography variant='h4' sx={{ mb: 5, fontWeight: 700 }}>
				Welcome back{userData?.name ? `, ${userData?.name}` : ''}
			</Typography>
			<Typography variant='h5' sx={{ pb: 5 }}>
				What are you up to doing today? Go back to what you were working on
				before or start something new.
			</Typography>

			<Paper sx={{ borderRadius: '28px', padding: '10px 20px' }}>
				{isLoading ? (
					<Box sx={{ height: '300px', position: 'relative' }}>
						<Loader />
					</Box>
				) : (
					uncompletedTasks.map((task, index) => (
						<TaskCard
							taskData={task}
							key={task.id}
							onDataChange={refreshTodoList}
							noBottomBorder={index === uncompletedTasks.length - 1}
						/>
					))
				)}
			</Paper>

			<Button
				fullWidth
				variant='contained'
				href='/new-pomodoro'
				sx={{ mt: 5, py: 1.5 }}>
				<Iconify icon='material-symbols:add-rounded' />
				<Typography
					sx={{ textTransform: 'capitalize', fontWeight: 700, pl: 1 }}>
					Create new pomodoro
				</Typography>
			</Button>
		</Box>
	);
}
