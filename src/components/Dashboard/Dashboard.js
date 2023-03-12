import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { TaskCard } from '../TaskCard';
import { useTodosList } from '../../hooks/useTodosList';

import styles from './Dashboard.module.scss';

export function Dashboard() {
	const { todoList, refreshTodoList } = useTodosList();

	return (
		<>
			<Typography variant='h4' sx={{ mb: 5 }}>
				Hi, welcome back!
			</Typography>
			<Typography variant='h5' sx={{ pb: 1 }}>
				What are you up to doing today?
			</Typography>
			<Link to='/new-pomodoro' className={styles.link}>
				<Typography variant='h6' sx={{ py: 2, fontWeight: 400 }}>
					Start working on something new...
				</Typography>
			</Link>
			<Typography variant='h6' sx={{ pb: 2, fontWeight: 400 }}>
				...or get back to something you've already worked on
			</Typography>

			{todoList.map((task) => (
				<TaskCard
					taskData={task}
					key={task.id}
					onDataChange={refreshTodoList}
				/>
			))}
		</>
	);
}
