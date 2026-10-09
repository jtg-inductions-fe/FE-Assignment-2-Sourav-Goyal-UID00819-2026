import { Link as RouterLink } from 'react-router-dom';

import {
    AppBar,
    Link as MuiLink,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';

import { navLinks } from './navbar.constants';

export const Navbar = () => (
    <AppBar position="static" sx={{ px: 4 }}>
        <Toolbar
            sx={{
                justifyContent: { xs: 'space-between', md: 'flex-start' },
                gap: 9,
            }}
        >
            <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                    color: 'inherit',
                }}
            >
                Github Services
            </Typography>
            <Stack direction="row" gap={5}>
                {navLinks.map((link) => (
                    <MuiLink
                        key={link.title}
                        color="inherit"
                        component={RouterLink}
                        to={link.url}
                        underline="hover"
                    >
                        {link.title}
                    </MuiLink>
                ))}
            </Stack>
        </Toolbar>
    </AppBar>
);
