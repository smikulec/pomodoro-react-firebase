import { Card, IconButton, MenuItem, Popover, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState } from 'react';
import { Iconify } from '../Iconify';
import { useEditTaskModal } from '../EditTaskModal/useEditTaskModal';
import { Link } from 'react-router-dom';

import { useTodosList } from '../../hooks/useTodosList';

import styles from './TaskCard.module.scss';

export const TaskCard = ({
	taskData,
	onDataChange,
	hasMenuButton = false,
	noBottomBorder = false,
}) => {
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
		<Card
			sx={{
				maxWidth: '700px',
				padding: '20px 10px',
				backgroundColor: 'transparent',
				border: 'none',
				borderBottom: noBottomBorder ? 'none' : '1px solid rgba(0, 0, 0, 0.09)',
				boxShadow: 'none',
			}}>
			<Stack direction='row' alignItems='center' spacing={2}>
				<Box
					sx={{
						minWidth: 240,
						flexGrow: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Iconify
							icon='material-symbols:assignment-turned-in-outline-rounded'
							sx={{
								color: '#D55448',
								backgroundColor: '#D9D9D94A',
								padding: '15px',
								borderRadius: '12px',
							}}
						/>

						<Typography color='inherit' variant='subtitle1' sx={{ pl: 3 }}>
							{hasMenuButton ? (
								<Link
									to='/timer'
									state={{ data: taskData }}
									className={styles.link}>
									{taskData?.taskName}
								</Link>
							) : (
								taskData?.taskName
							)}
						</Typography>
					</Box>

					{!taskData?.isCompleted && pomodoroNumber > 0 && (
						<Stack direction='row' alignItems='center' flexWrap='nowrap'>
							{pomodoroNumber > 1 && (
								<Typography
									sx={{
										color: '#D55448',
										fontSize: '21px',
										fontWeight: '600',
									}}>
									{pomodoroNumber}
								</Typography>
							)}
							<Iconify
								icon='material-symbols:pace'
								width={25}
								height={25}
								sx={{ color: '#D55448', px: '5px' }}
							/>
						</Stack>
					)}
				</Box>

				{!taskData?.isCompleted ? (
					hasMenuButton ? (
						<>
							{/* <Stack direction='row'>
								<IconRenderer number={pomodoroNumber} />
							</Stack> */}
							<Box sx={{ ml: '0 !important' }}>
								<IconButton
									size='large'
									color='inherit'
									sx={{ opacity: 0.48 }}
									onClick={handleOpenMenu}>
									<Iconify
										icon='eva:more-vertical-fill'
										width={25}
										height={25}
									/>
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
												borderRadius: '28px',
											},
										},
									}}>
									<MenuItem onClick={handleMarkComplete}>
										<Iconify
											icon='eva:checkmark-circle-2-fill'
											sx={{ mr: 2 }}
										/>
										Mark complete
									</MenuItem>

									<MenuItem onClick={handleEdit}>
										<Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
										Edit
									</MenuItem>

									<MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
										<Iconify icon='eva:trash-2-outline' sx={{ mr: 2 }} />
										Delete
									</MenuItem>
								</Popover>
							</Box>
						</>
					) : (
						<Box sx={{ flexShrink: 0 }}>
							<Link to='/timer' state={{ data: taskData }}>
								<IconButton
									size='large'
									color='inherit'
									sx={{
										backgroundColor: '#FCC78630',
										padding: '15px',
										':hover': { backgroundColor: '#e5b57930' },
									}}>
									<Iconify
										icon='material-symbols:arrow-right-alt-rounded'
										sx={{ color: '#D55448' }}
									/>
								</IconButton>
							</Link>
						</Box>
					)
				) : null}
			</Stack>
		</Card>
	);
};
