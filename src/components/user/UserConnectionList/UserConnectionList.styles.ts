import { Box, List, styled, Typography } from '@mui/material';

export const ConnectionListContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

export const StyledList = styled(List)({
    padding: 0,
});

export const EmptyMessage = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));
