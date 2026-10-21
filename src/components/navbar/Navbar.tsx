import { Link as RouterLink } from 'react-router-dom';

import { Link as MuiLink, Stack } from '@mui/material';

import { Logout } from '@/components/logout';
import { useAppSelector } from '@/store/store';

import { navLinks } from './navbar.constants';
import * as S from './Navbar.styles';

export const Navbar = () => {
    const user = useAppSelector((state) => state.user.user);

    const visibleLinks = navLinks.filter((link) => {
        if (link.visibility === 'all') return true;
        if (user && link.visibility === 'private') return true;
        if (!user && link.visibility === 'public') return true;
        return false;
    });

    return (
        <S.StyledAppBar position="fixed">
            <S.NavToolbar>
                <S.BrandTitle variant="h6" component={RouterLink} to="/">
                    Github Services
                </S.BrandTitle>
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
            </S.NavToolbar>
        </S.StyledAppBar>
    );
};
