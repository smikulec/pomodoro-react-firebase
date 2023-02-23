import React from 'react';
import { Stack, Modal as MuiModal, Typography, Box } from '@mui/material';

const modalStyles = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
};

export const Modal = ({ title, isOpen, onClose, children }) => {
	return (
		<MuiModal open={isOpen} onClose={onClose}>
			<Box sx={modalStyles}>
				<Typography variant='h4'>{title}</Typography>
				{children}
			</Box>
		</MuiModal>
	);
};

const ModalContent = ({ children, className }) => {
	return <Box className={className}>{children}</Box>;
};

Modal.Content = ModalContent;

const ModalFooter = ({ children }) => {
	return (
		<Stack direction='row' alignItems='center' spacing={2}>
			{children}
		</Stack>
	);
};

Modal.Footer = ModalFooter;
