import React from 'react';
import { Outlet } from 'react-router-dom';

// Components
import Topbar from './Topbar';
import Sidebar from './Sidebar';

const Layout = () => {
    return(
        <>
            <Topbar />
            <Sidebar />
            <Outlet />
        </>
    );
}

export default Layout;