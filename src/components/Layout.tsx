import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { Navbar } from '@/components/navbar/Navbar';

const Layout = () => (
    <Box>
        <Navbar />
        <Box component={'main'}>
            <Outlet />
        </Box>
    </Box>
);

export default Layout;
