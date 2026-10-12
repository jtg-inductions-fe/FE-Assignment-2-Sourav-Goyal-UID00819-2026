import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/store/store';

const PublicRoute = () => {
    const user = useAppSelector((state) => state.user.user);

    if (user) {
        return <Navigate to="/profile" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
