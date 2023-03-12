import { Modal, useModalDialog } from '../Modal';
import { Button, Input, InputLabel, Typography } from '@mui/material';
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
					<InputLabel sx={{ mb: 3 }}>
						<Typography sx={{ mb: 1 }} color='text.primary'>
							Change task name
						</Typography>
						<Input
							name='taskName'
							type='text'
							value={taskName}
							onChange={(event) => setTaskName(event.target.value)}
						/>
					</InputLabel>

					<CounterWizard
						title='Change work length'
						time={sessionLength}
						onLengthChange={setSessionLength}
					/>
					<CounterWizard
						title='Change short break length'
						time={shortBreakLength}
						onLengthChange={setShortBreakLength}
					/>
					<CounterWizard
						title='Change long break length'
						time={longBreakLength}
						onLengthChange={setLongBreakLength}
					/>
					<CounterWizard
						title='Change the number of pomodoro rounds before the long break'
						time={rounds}
						onLengthChange={setRounds}
					/>
				</Modal.Content>
				<Modal.Footer>
					<Button variant='outlined' onClick={handleCancelChanges}>
						Cancel
					</Button>
					<Button variant='contained' onClick={handleSaveChanges}>
						Save changes
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
);
