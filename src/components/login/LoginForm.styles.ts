import { styled, Typography } from '@mui/material';

export const FormSubtitle = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
    textTransform: 'capitalize',
}));
