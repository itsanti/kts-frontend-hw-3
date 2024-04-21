import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "components/AppHeader";
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
    return (
        <div className={styles.root}>
            <AppHeader />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;