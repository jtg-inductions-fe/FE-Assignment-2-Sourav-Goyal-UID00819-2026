import { Link as RouterLink } from 'react-router-dom';

import {
    AppBar,
    Box,
    Link as MuiLink,
    Toolbar,
    Typography,
} from '@mui/material';

const navLinks = [{ title: 'Search', url: '/search' }];

const Navbar = () => (
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
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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
            </Box>
        </Toolbar>
    </AppBar>
);

export default Navbar;
