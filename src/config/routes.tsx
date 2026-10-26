import type { RouteObject } from 'react-router-dom';

import PrivateRoute from '@/components/common/PrivateRoute';
import PublicRoute from '@/components/common/PublicRoute';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import Search from '@/pages/Search';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/search',
                element: <Search />,
            },
            {
                element: <PublicRoute />,
                children: [
                    {
                        path: '/login',
                        element: <Login />,
                    },
                ],
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: '/profile',
                        element: <Profile />,
                    },
                ],
            },
        ],
    },
];
