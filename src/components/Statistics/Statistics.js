import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useTodosList } from '../../hooks/useTodosList';
import { NavBar } from '../NavBar';
import { StatCard } from '../StatCard';
import { TaskCard } from '../TaskCard';

import styles from './Statistics.module.scss';

export const Statistics = () => {
	const { todoList, refreshTodoList } = useTodosList();

	return (
		<>
			<NavBar />
			<main>
				<Container maxWidth='xl'>
					<Typography
						variant='h4'
						textAlign='center'
						sx={{ marginTop: '40px' }}>
						Here you can see how much great work you've done
					</Typography>
					<Grid container spacing={3} sx={{ marginTop: '20px' }}>
						<Grid item xs={12} sm={6} md={3}>
							<StatCard title='Today' />
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<StatCard title='Week' />
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<StatCard title='Month' />
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<StatCard title='Total' />
						</Grid>
					</Grid>

					<Grid container spacing={2} sx={{ marginTop: '20px' }}>
						<Grid item xs={12} sm={6} md={6}>
							<Typography variant='h5'>Tasks completed</Typography>
							{todoList.map((task) => (
								<TaskCard
									taskData={task}
									key={task.id}
									onDataChange={refreshTodoList}
								/>
							))}
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<Typography variant='h5'>Tasks doing</Typography>
							{todoList.map((task) => (
								<TaskCard
									taskData={task}
									key={task.id}
									onDataChange={refreshTodoList}
								/>
							))}
						</Grid>
					</Grid>
				</Container>
			</main>
		</>
	);
};
