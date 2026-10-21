import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/store/store';

export const PublicRoute = () => {
    const user = useAppSelector((state) => state.user.user);

    if (user) {
        return <Navigate to="/profile" replace />;
    }

    return <Outlet />;
};
