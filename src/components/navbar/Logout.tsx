import { useState } from 'react';

import {
    Avatar,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from '@mui/material';

import { clearUser } from '@/store/slices/user-slice';
import { useAppDispatch } from '@/store/store';
import type { UserDetail } from '@/types/user';

interface NavbarUserMenuProps {
    user: UserDetail;
}

export const Logout = ({ user }: NavbarUserMenuProps) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleCloseMenu();
        localStorage.removeItem('token');
        localStorage.removeItem('pat_token');
        dispatch(clearUser());
    };

    return (
        <>
            <Tooltip title={user.login}>
                <IconButton onClick={handleOpenMenu} sx={{ ml: 'auto', p: 0 }}>
                    <Avatar
                        src={user.avatar_url}
                        alt={user.login}
                        sx={{ width: 36, height: 36 }}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                    paper: {
                        elevation: 3,
                        sx: { mt: 1 },
                    },
                }}
            >
                <MenuItem disabled sx={{ opacity: '1 !important' }}>
                    <Typography variant="body2" fontWeight={600}>
                        {user.login}
                    </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};
