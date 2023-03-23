import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Box } from '@mui/system';
import {
	Drawer,
	List,
	ListItemButton,
	ListItemText,
	ListItem,
	AppBar,
	IconButton,
	Stack,
} from '@mui/material';
import { Iconify } from '../Iconify';

const LogoutButton = styled(Button)({
	marginBottom: '30px',
});
const NAV_WIDTH = 280;

const navConfig = [
	{
		title: 'dashboard',
		path: '/dashboard',
		id: 0,
	},
	{
		title: 'new pomodoro',
		path: '/new-pomodoro',
		id: 1,
	},
	{
		title: 'statistics',
		path: '/statistics',
		id: 2,
	},
];

export const StyledNavItem = styled((props) => (
	<ListItemButton disableGutters {...props} />
))(({ theme }) => ({
	...theme.typography.body1,
	position: 'relative',
	textTransform: 'uppercase',
	color: theme.palette.text.secondary,
	borderRadius: theme.shape.borderRadius,
	padding: '15px 40px',
}));

const NavList = ({ data }) => {
	return (
		<List sx={{ padding: '50px 0' }}>
			{data.map((item) => (
				<ListItem disablePadding key={item.id}>
					<StyledNavItem
						component={NavLink}
						to={item.path}
						sx={{
							'&.active': {
								color: 'text.primary',
								bgcolor: 'action.selected',
								fontWeight: 'fontWeightBold',
							},
						}}>
						<ListItemText disableTypography primary={item.title} />
					</StyledNavItem>
				</ListItem>
			))}
		</List>
	);
};

const NavContent = ({ data, onButtonClick }) => {
	return (
		<Box sx={{ position: 'relative', height: '100%' }}>
			<NavList data={navConfig} />
			<LogoutButton
				variant='contained'
				onClick={onButtonClick}
				sx={{
					position: 'absolute',
					bottom: '0',
					left: '50%',
					transform: 'translateX(-50%)',
				}}>
				Logout
			</LogoutButton>
		</Box>
	);
};

export const NavBar = () => {
	const [open, setOpen] = useState(false);
	const { onLogout } = useAuth();
	const isDesktop = useMediaQuery('(min-width: 1024px)');

	return (
		<Box
			component='nav'
			sx={{
				flexShrink: 0,
				minWidth: isDesktop ? NAV_WIDTH : 0,
				bgcolor: 'background.paper',
			}}>
			{isDesktop ? (
				<Drawer
					open
					variant='permanent'
					anchor='left'
					PaperProps={{
						elevation: 3,
						sx: {
							minWidth: NAV_WIDTH,
							flexShrink: 0,
							boxSizing: 'border-box',
						},
					}}>
					<NavContent onButtonClick={onLogout} />
				</Drawer>
			) : (
				<AppBar>
					<Stack
						direction='row'
						alignItems='center'
						justifyContent='space-between'>
						<IconButton
							onClick={() => setOpen(true)}
							sx={{
								ml: 1,
								color: 'text.primary',
								display: { lg: 'none' },
								width: '50px',
							}}>
							<Iconify icon='material-symbols:menu-rounded' color='white' />
						</IconButton>
					</Stack>
					<Drawer
						open={open}
						onClose={() => setOpen(false)}
						ModalProps={{
							keepMounted: true,
						}}
						PaperProps={{
							sx: { width: NAV_WIDTH },
						}}>
						<NavContent onButtonClick={onLogout} />
					</Drawer>
				</AppBar>
			)}
		</Box>
	);
};
