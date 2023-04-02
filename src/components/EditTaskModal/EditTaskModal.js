import { Modal, useModalDialog } from '../Modal';
import { Button, InputLabel, OutlinedInput } from '@mui/material';
import { CounterWizard } from '../CounterWizard';
import { useState } from 'react';
import { useTodosList } from '../../hooks/useTodosList';
import { registerModalDialog } from '../Modal/modalRegistration';

export const EditTaskModal = registerModalDialog(
	({ taskData, onDataChange }) => {
		const [sessionLength, setSessionLength] = useState(taskData.sessionLength);
		const [shortBreakLength, setShortBreakLength] = useState(
			taskData.shortBreakLength
		);
		const [longBreakLength, setLongBreakLength] = useState(
			taskData.longBreakLength
		);
		const [rounds, setRounds] = useState(taskData.rounds);
		const [taskName, setTaskName] = useState(taskData.taskName);

		const editTaskModalHandler = useModalDialog();

		const { updateTodo } = useTodosList();

		const handleSaveChanges = () => {
			const data = {
				...taskData,
				taskName: taskName,
				rounds: rounds,
				sessionLength: sessionLength,
				shortBreakLength: shortBreakLength,
				longBreakLength: longBreakLength,
				totalTime: 0,
				isCompleted: false,
			};
			updateTodo(data);
			onDataChange();
			editTaskModalHandler.destroyModal();
		};

		const handleCancelChanges = () => {
			editTaskModalHandler.destroyModal();
		};

		return (
			<Modal
				title={taskData?.taskName}
				isOpen={editTaskModalHandler.isModalVisible}
				onClose={editTaskModalHandler.destroyModal}>
				<Modal.Content>
					<InputLabel sx={{ color: '#000000', fontWeight: 700, pb: 2 }}>
						Change task name
					</InputLabel>
					<OutlinedInput
						fullWidth
						name='taskName'
						type='text'
						value={taskName}
						sx={{ mb: 2 }}
						onChange={(event) => setTaskName(event.target.value)}
					/>

					<CounterWizard
						title='Work session length'
						time={sessionLength}
						onLengthChange={setSessionLength}
					/>
					<CounterWizard
						title='Pomodoro rounds'
						time={rounds}
						onLengthChange={setRounds}
					/>
					<CounterWizard
						title='Short break length'
						time={shortBreakLength}
						onLengthChange={setShortBreakLength}
					/>
					<CounterWizard
						title='Long break length'
						time={longBreakLength}
						onLengthChange={setLongBreakLength}
					/>
				</Modal.Content>
				<Modal.Footer>
					<Button
						variant='outlined'
						onClick={handleCancelChanges}
						sx={{
							textTransform: 'unset',
							fontWeight: 700,

							':hover': { backgroundColor: '#eebc7d', color: '#FFFFFF' },
						}}>
						Cancel
					</Button>
					<Button
						variant='contained'
						onClick={handleSaveChanges}
						sx={{
							textTransform: 'unset',
							fontWeight: 700,
							':hover': { backgroundColor: '#eebc7d' },
						}}>
						Save changes
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
);
