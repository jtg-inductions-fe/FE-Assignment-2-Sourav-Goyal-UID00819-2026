import { Box, styled } from '@mui/material';

export const NotFoundContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: theme.spacing(8, 2),
    width: '100%',
}));

export const NotFoundImage = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: 400,
    marginBottom: theme.spacing(4),
}));
