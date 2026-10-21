import { Box, Button, styled, Typography } from '@mui/material';

export const FollowButtonContainer = styled(Box)(({ theme }) => ({
    marginLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
}));

export const FollowActionButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5),
}));

export const LoadingFollowButton = styled(Button)(({ theme }) => ({
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
}));

export const FollowingText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}));
