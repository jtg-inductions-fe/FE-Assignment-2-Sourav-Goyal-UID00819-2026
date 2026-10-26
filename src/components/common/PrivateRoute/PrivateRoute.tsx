import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/store/store';

export const PrivateRoute = () => {
    const user = useAppSelector((state) => state.user.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
