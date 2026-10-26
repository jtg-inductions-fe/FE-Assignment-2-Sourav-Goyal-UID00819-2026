import { Button, styled } from '@mui/material';

export const SearchForm = styled('form')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));

export const SearchButton = styled(Button)(({ theme }) => ({
    height: '40px',
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: 'initial',
    },
}));
