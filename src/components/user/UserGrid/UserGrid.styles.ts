import { Box, Button, styled } from '@mui/material';

export const ActionsContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
});

export const RefreshButton = styled(Button)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

export const GridContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'shouldColumnWise',
})<{ shouldColumnWise?: boolean }>(({ theme, shouldColumnWise }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: shouldColumnWise ? '1fr' : 'repeat(2, 1fr)',
    },
}));
