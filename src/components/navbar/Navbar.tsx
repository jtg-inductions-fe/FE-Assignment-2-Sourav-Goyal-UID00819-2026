import { Link as RouterLink } from 'react-router-dom';

import {
    AppBar,
    Button,
    Link as MuiLink,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';

import { clearUser } from '@/store/slices/user-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';

import { navLinks } from './navbar.constants';

export const Navbar = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.user);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('pat_token');
        dispatch(clearUser());
    };

    const visibleLinks = navLinks.filter((link) => {
        if (link.visibility === 'all') return true;
        if (user && link.visibility === 'private') return true;
        if (!user && link.visibility === 'public') return true;
        return false;
    });

    return (
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
                {user && (
                    <Button
                        color="success"
                        onClick={handleLogout}
                        sx={{ ml: 'auto' }}
                    >
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};
