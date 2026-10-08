import { Outlet } from 'react-router-dom';

import Navbar from './navbar';

const Layout = () => (
    <div>
        <Navbar />
        <main>
            <Outlet />
        </main>
    </div>
);

export default Layout;
