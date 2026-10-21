import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { Navbar } from '@/components/navbar';

const Layout = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Navbar />
        <Box
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        >
            <Outlet />
        </Box>
    </Box>
);

export default Layout;
