import { useModal } from '@ebay/nice-modal-react';

export const useModalDialog = (modal, args) => {
	const modalDialog = useModal(modal, args);

	return {
		hideModal: modalDialog.hide,
		modalId: modalDialog.id,
		rejectModal: modalDialog.reject,
		resolveModal: modalDialog.resolve,
		showModal: modalDialog.show,
		updateModal: modalDialog.show,
		isModalVisible: modalDialog.visible,
		destroyModal: modalDialog.remove,
	};
};
