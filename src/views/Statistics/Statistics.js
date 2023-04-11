import { Box, Grid, Paper, Typography } from '@mui/material';
import { useSessionData, useTodosList } from '../../hooks';
import { StatCard, TaskCard, Loader } from '../../components';

export const Statistics = () => {
	const { todoList, refreshTodoList, isLoading } = useTodosList();
	const { todaysSession, lastMonthData, lastWeekData, overallData } =
		useSessionData();

	const completedTasks = todoList.filter((todo) => todo.isCompleted);
	const uncompletedTasks = todoList.filter((todo) => !todo.isCompleted);

	return (
		<Box>
			<Typography variant='h4' sx={{ fontWeight: 700 }}>
				Here you can see how much great work you've done
			</Typography>
			<Grid container spacing={3} sx={{ marginTop: '20px' }}>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						title='Today'
						total={todaysSession?.totalTime ?? 0}
						icon='material-symbols:today-outline-rounded'
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						title='Week'
						total={lastWeekData}
						icon='material-symbols:date-range-outline-rounded'
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						title='Month'
						total={lastMonthData}
						icon='material-symbols:calendar-month-outline-rounded'
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						title='Total'
						total={overallData}
						icon='material-symbols:equal-rounded'
					/>
				</Grid>
			</Grid>

			<Grid container spacing={3} sx={{ marginTop: '20px' }}>
				<Grid item xs={12} sm={6} md={6}>
					<Typography variant='h5' sx={{ pl: 4, pb: 2 }}>
						Tasks completed
					</Typography>
					<Paper sx={{ borderRadius: '28px', padding: '10px 20px' }}>
						{isLoading ? (
							<Box sx={{ height: '300px', position: 'relative' }}>
								<Loader />
							</Box>
						) : (
							completedTasks.map((task, index) => (
								<TaskCard
									taskData={task}
									key={task.id}
									onDataChange={refreshTodoList}
									noBottomBorder={index === completedTasks.length - 1}
								/>
							))
						)}
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<Typography variant='h5' sx={{ pl: 4, pb: 2 }}>
						Tasks doing
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
									hasMenuButton={true}
								/>
							))
						)}
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};
