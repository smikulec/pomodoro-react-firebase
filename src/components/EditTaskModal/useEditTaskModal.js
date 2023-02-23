import { useModalDialog } from '../Modal';
import { EditTaskModal } from './EditTaskModal';

export const useEditTaskModal = ({ ...otherOptions } = {}) => {
	const editTaskModal = useModalDialog(EditTaskModal, { ...otherOptions });

	return editTaskModal;
};
