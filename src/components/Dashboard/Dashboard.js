import React from 'react';
import { NavBar } from '../NavBar';
import { Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { TaskCard } from '../TaskCard';
import { useTodosList } from '../../hooks/useTodosList';

export function Dashboard() {
	const { todoList, refreshTodoList } = useTodosList();

	return (
		<>
			<NavBar />
			<main>
				<Container maxWidth='xl'>
					<Typography variant='h4' sx={{ mb: 5, mt: 10 }}>
						Hi, Welcome back
					</Typography>
					<Typography variant='h5'>What are you up to doing today?</Typography>
					<Link to='/new-pomodoro'>
						<Typography variant='h5'>Start working on something new</Typography>
					</Link>
					<Typography variant='h5'>
						...or get back to something you've already worked on
					</Typography>

					{todoList.map((task) => (
						<TaskCard
							taskData={task}
							key={task.id}
							onDataChange={refreshTodoList}
						/>
					))}
				</Container>
			</main>
		</>
	);
}
