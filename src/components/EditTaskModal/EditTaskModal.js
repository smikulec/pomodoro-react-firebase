import { Modal, useModalDialog } from '../Modal';
import { Button, InputLabel, OutlinedInput } from '@mui/material';
import { CounterWizard } from '../CounterWizard';
import { useState } from 'react';
import { useTodosList } from '../../hooks/useTodosList';
import { registerModalDialog } from '../Modal/modalRegistration';
import { useForm } from 'react-hook-form';

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

		const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm({ defaultValues: taskData });

		const editTaskModalHandler = useModalDialog();

		const { updateTodo } = useTodosList();

		const handleSaveChanges = (data) => {
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
				<form onSubmit={handleSubmit(handleSaveChanges)}>
					<Modal.Content>
						<InputLabel
							sx={{ color: 'primary.contrastText', fontWeight: 700, pb: 2 }}>
							Change task name
						</InputLabel>
						<OutlinedInput
							fullWidth
							name='taskName'
							{...register('taskName', { required: true })}
							error={errors?.taskName ? true : false}
							type='text'
							sx={{ mb: 2 }}
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

								':hover': { color: '#FFFFFF' },
							}}>
							Cancel
						</Button>
						<Button
							variant='contained'
							type='submit'
							sx={{
								textTransform: 'unset',
								fontWeight: 700,
							}}>
							Save changes
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		);
	}
);
