import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "components/AppHeader";

const Layout: React.FC = () => {
    return (
        <div>
            <AppHeader />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;