import type { RouteObject } from 'react-router-dom';

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
                path: '/login',
                element: <Login />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
        ],
    },
];
