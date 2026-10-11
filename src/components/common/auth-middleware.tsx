import { useEffect } from 'react';

import { Box, CircularProgress } from '@mui/material';

import { useGetAuthenticatedUserQuery } from '@/services/github';
import { clearUser, setUser } from '@/store/slices/user-slice';
import { useAppDispatch } from '@/store/store';

interface AuthMiddlewareProps {
    children: React.ReactNode;
}

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
    const dispatch = useAppDispatch();
    const token = localStorage.getItem('token');
    const {
        data: user,
        isLoading,
        isError,
    } = useGetAuthenticatedUserQuery(undefined, { skip: !token });

    useEffect(() => {
        if (user) {
            dispatch(setUser(user));
        }

        if (isError) {
            localStorage.removeItem('pat_token');
            dispatch(clearUser());
        }
    }, [user, isError, dispatch]);

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return <>{children}</>;
};

export default AuthMiddleware;
