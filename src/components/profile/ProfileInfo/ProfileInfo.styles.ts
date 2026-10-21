import { Box, styled, Typography } from '@mui/material';

export const BioText = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

export const StatsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(4),
    marginBottom: theme.spacing(3),
}));

export const EmailText = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));
