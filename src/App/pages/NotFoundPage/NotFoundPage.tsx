import React from "react"
import { Link } from "react-router-dom";
import Button from "components/Button";
import Text from "components/Text"
import { ROUTES } from "config/constants";
import styles from './NotFoundPage.module.scss'

const NotFoundPage: React.FC = () => {
    return (
        <div className={styles.root}>
            <Text view="p-20" weight="bold">Error: 404 Page Not Found</Text>
            <Link to={ROUTES.index}>
                <Button className={styles.home}>Home</Button>
            </Link>
        </div>
    );
}

export default NotFoundPage