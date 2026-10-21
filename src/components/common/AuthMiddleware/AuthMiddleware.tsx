import { useEffect } from 'react';

import { CircularProgress } from '@mui/material';

import { useGetAuthenticatedUserQuery } from '@/services/github';
import { clearUser, setUser } from '@/store/slices/user-slice';
import { useAppDispatch } from '@/store/store';

import { LoadingContainer } from './AuthMiddleware.styles';
import type { AuthMiddlewareProps } from './AuthMiddleware.types';

export const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
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
    }, [user, isError]);

    if (isLoading) {
        return (
            <LoadingContainer>
                <CircularProgress />
            </LoadingContainer>
        );
    }

    return <>{children}</>;
};
