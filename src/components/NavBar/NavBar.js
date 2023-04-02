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
	Typography,
} from '@mui/material';
import { Iconify } from '../Iconify';

const LogoutButton = styled(Button)({
	marginBottom: '30px',
});
const NAV_WIDTH = 280;

const navConfig = [
	{
		id: 0,
		title: 'Dashboard',
		path: '/dashboard',
		icon: 'material-symbols:space-dashboard-outline',
	},
	{
		id: 1,
		title: 'New pomodoro',
		path: '/new-pomodoro',
		icon: 'material-symbols:timer-outline-rounded',
	},
	{
		id: 2,
		title: 'Statistics',
		path: '/statistics',
		icon: 'material-symbols:bar-chart-4-bars-rounded',
	},
];

export const StyledNavItem = styled((props) => (
	<ListItemButton disableGutters {...props} />
))(({ theme }) => ({
	...theme.typography.body1,
	position: 'relative',
	color: '#000000',
	borderRadius: '6px',
	padding: '10px 20px',
	margin: '10px 20px',
}));

const NavList = ({ data, onNavClick }) => {
	return (
		<List sx={{ padding: '50px 0' }}>
			{data.map((item) => (
				<ListItem disablePadding key={item.id}>
					<StyledNavItem
						component={NavLink}
						to={item.path}
						sx={{
							display: 'flex',
							alignItems: 'center',
							fontWeight: 400,
							'&.active': {
								color: 'text.primary',
								bgcolor: 'primary.main',
								fontWeight: 'fontWeightBold',
							},
						}}
						onClick={onNavClick}>
						<Iconify icon={item.icon} sx={{ mr: 1.5, fontWeight: 400 }} />
						<ListItemText disableTypography primary={item.title} />
					</StyledNavItem>
				</ListItem>
			))}
		</List>
	);
};

const NavContent = ({ onButtonClick, onNavClick }) => {
	return (
		<Box sx={{ position: 'relative', height: '100%' }}>
			<NavList data={navConfig} onNavClick={onNavClick} />
			<LogoutButton
				variant='text'
				onClick={onButtonClick}
				sx={{
					position: 'absolute',
					bottom: '0',
					left: '20px',
					color: '#000000',
					textTransform: 'capitalize',
				}}>
				<Iconify icon='material-symbols:logout-rounded' />
				<Typography as='p1' sx={{ pl: 1, fontWeight: 700 }}>
					log out
				</Typography>
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
				bgcolor: 'transparent',
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
				<AppBar
					sx={{
						bgcolor: '#F5F2EA',
						boxShadow: 'none',
						py: 1,
					}}>
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
								height: '50px',
							}}>
							<Iconify
								icon='material-symbols:menu-rounded'
								color='#D55448'
								width='24px'
							/>
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
						<NavContent
							onButtonClick={onLogout}
							onNavClick={() => setOpen(false)}
						/>
					</Drawer>
				</AppBar>
			)}
		</Box>
	);
};
