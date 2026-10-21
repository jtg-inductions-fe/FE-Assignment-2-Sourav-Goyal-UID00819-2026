import { styled, Typography } from '@mui/material';

export const SuggestionsTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
}));
