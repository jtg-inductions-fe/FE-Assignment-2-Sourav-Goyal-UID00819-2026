import { Box, styled, Typography } from '@mui/material';

export const SearchInputWrapper = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    marginTop: theme.spacing(2),
}));

export const ResultsContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
}));

export const PaginationWrapper = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center',
}));
