import { Avatar, Box, styled, Typography } from '@mui/material';

export const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(4),
}));

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.typography.pxToRem(100),
    height: theme.typography.pxToRem(100),
}));

export const ProfileTitle = styled(Typography)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
}));

export const LocationText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));
