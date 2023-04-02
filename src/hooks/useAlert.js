import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useAlert = () => {
	let showAlert = {};

	showAlert.success = (message) => {
		return toast.success(message);
	};

	showAlert.error = (message) => {
		return toast.error(message);
	};

	showAlert.info = (message) => {
		return toast.info(message);
	};

	return { showAlert };
};
