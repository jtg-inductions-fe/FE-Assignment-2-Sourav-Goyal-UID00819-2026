import type { RouteObject } from 'react-router-dom';

import PrivateRoute from '@/components/common/private-route';
import PublicRoute from '@/components/common/public-route';
import Layout from '@/components/layout';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Profile from '@/pages/profile';
import Search from '@/pages/search';

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
