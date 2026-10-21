import { useState } from 'react';

import { Divider, Tooltip, Typography } from '@mui/material';

import { clearUser } from '@/store/slices/user-slice';
import { useAppDispatch } from '@/store/store';

import * as S from './Logout.styles';
import type { LogoutProps } from './Logout.types';

export const Logout = ({ user }: LogoutProps) => {
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
                <S.UserIconButton onClick={handleOpenMenu}>
                    <S.UserAvatar src={user.avatar_url} alt={user.login} />
                </S.UserIconButton>
            </Tooltip>
            <S.UserMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                    paper: {
                        elevation: 3,
                    },
                }}
            >
                <S.DisabledMenuItem disabled>
                    <Typography variant="body2" fontWeight={600}>
                        {user.login}
                    </Typography>
                </S.DisabledMenuItem>
                <Divider />
                <S.LogoutMenuItem onClick={handleLogout}>
                    Logout
                </S.LogoutMenuItem>
            </S.UserMenu>
        </>
    );
};
