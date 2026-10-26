import type { RouteObject } from 'react-router-dom';

import { PrivateRoute } from '@/components/common/PrivateRoute';
import { PublicRoute } from '@/components/common/PublicRoute';
import Layout from '@/components/Layout';
import Error from '@/pages/Error';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFoundPage from '@/pages/NotFound';
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
        errorElement: <Error />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];
