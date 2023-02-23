import { Modal, useModalDialog } from '../Modal';
import { Button, Input, InputLabel } from '@mui/material';
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
			console.log(data);
			updateTodo(data);
			onDataChange();
			editTaskModalHandler.destroyModal();
		};

		const handleCancelChanges = () => {
			editTaskModalHandler.destroyModal();
		};

		console.log('isModalVisible', editTaskModalHandler.isModalVisible);

		return (
			<Modal
				title={taskName}
				isOpen={editTaskModalHandler.isModalVisible}
				onClose={editTaskModalHandler.destroyModal}>
				<Modal.Content>
					<InputLabel>
						<Input
							type='text'
							value={taskName}
							onChange={(event) => setTaskName(event.target.value)}
						/>
					</InputLabel>

					<CounterWizard
						title='Set your work length'
						time={sessionLength}
						onLengthChange={setSessionLength}
					/>
					<CounterWizard
						title='Set your short break length'
						time={shortBreakLength}
						onLengthChange={setShortBreakLength}
					/>
					<CounterWizard
						title='Set your long break length'
						time={longBreakLength}
						onLengthChange={setLongBreakLength}
					/>
					<CounterWizard
						title='Set the number of pomodoro rounds before the long break'
						time={rounds}
						onLengthChange={setRounds}
					/>
				</Modal.Content>
				<Modal.Footer>
					<Button onClick={handleCancelChanges}>Cancel</Button>
					<Button onClick={handleSaveChanges}>Save changes</Button>
				</Modal.Footer>
			</Modal>
		);
	}
);
