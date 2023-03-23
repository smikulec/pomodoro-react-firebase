import { Grid, Typography } from '@mui/material';
import { useSessionData } from '../../hooks/useSessionData';
import { useTodosList } from '../../hooks/useTodosList';
import { StatCard } from '../StatCard';
import { TaskCard } from '../TaskCard';

export const Statistics = () => {
	const { todoList, refreshTodoList } = useTodosList();
	const { todaysSession, lastMonthData, lastWeekData, overallData } =
		useSessionData();

	const completedTasks = todoList.filter((todo) => todo.isCompleted);
	const uncompletedTasks = todoList.filter((todo) => !todo.isCompleted);

	return (
		<>
			<Typography variant='h4'>
				Here you can see how much great work you've done
			</Typography>
			<Grid container spacing={3} sx={{ marginTop: '20px' }}>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard title='Today' total={todaysSession.totalTime} />
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard title='Week' total={lastWeekData} />
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard title='Month' total={lastMonthData} />
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard title='Total' total={overallData} />
				</Grid>
			</Grid>

			<Grid container spacing={2} sx={{ marginTop: '20px' }}>
				<Grid item xs={12} sm={6} md={6}>
					<Typography variant='h5'>Tasks completed</Typography>
					{completedTasks.map((task) => (
						<TaskCard
							taskData={task}
							key={task.id}
							onDataChange={refreshTodoList}
						/>
					))}
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<Typography variant='h5'>Tasks doing</Typography>
					{uncompletedTasks.map((task) => (
						<TaskCard
							taskData={task}
							key={task.id}
							onDataChange={refreshTodoList}
						/>
					))}
				</Grid>
			</Grid>
		</>
	);
};
