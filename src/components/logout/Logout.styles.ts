import { Avatar, IconButton, Menu, MenuItem, styled } from '@mui/material';

export const UserIconButton = styled(IconButton)({
    marginLeft: 'auto',
    padding: 0,
});

export const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.typography.pxToRem(36),
    height: theme.typography.pxToRem(36),
}));

export const UserMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        marginTop: theme.spacing(1),
    },
}));

export const DisabledMenuItem = styled(MenuItem)({
    '&.Mui-disabled': {
        opacity: 1,
    },
});

export const LogoutMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.error.main,
}));
