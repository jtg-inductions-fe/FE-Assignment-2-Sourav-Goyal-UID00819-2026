import type { ElementType } from 'react';

import { AppBar, styled, Toolbar, Typography } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
}));

export const NavToolbar = styled(Toolbar)(({ theme }) => ({
    justifyContent: 'space-between',
    gap: theme.spacing(9),
    [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start',
    },
}));

export const BrandTitle = styled(Typography)<{
    component?: ElementType;
    to?: string;
}>({
    color: 'inherit',
});
