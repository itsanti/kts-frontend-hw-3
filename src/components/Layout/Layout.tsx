import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../../App/pages/components/AppHeader";

const Layout: React.FC = () => {
    return (
        <>
            <AppHeader />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;