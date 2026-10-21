import { Link as RouterLink } from 'react-router-dom';

import {
    AppBar,
    Link as MuiLink,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';

import { useAppSelector } from '@/store/store';

import { Logout } from './Logout';
import { navLinks } from './navbar.constants';

export const Navbar = () => {
    const user = useAppSelector((state) => state.user.user);

    const visibleLinks = navLinks.filter((link) => {
        if (link.visibility === 'all') return true;
        if (user && link.visibility === 'private') return true;
        if (!user && link.visibility === 'public') return true;
        return false;
    });

    return (
        <AppBar position="fixed" sx={{ px: 4 }}>
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
                    {visibleLinks.map((link) => (
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
                {user && <Logout user={user} />}
            </Toolbar>
        </AppBar>
    );
};
