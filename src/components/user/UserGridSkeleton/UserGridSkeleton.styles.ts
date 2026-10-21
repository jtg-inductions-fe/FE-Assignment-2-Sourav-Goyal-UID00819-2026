import { Box, styled } from '@mui/material';

export const GridSkeletonContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
}));
