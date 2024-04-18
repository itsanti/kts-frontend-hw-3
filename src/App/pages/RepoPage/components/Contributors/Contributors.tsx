import React from "react";
import Text from "components/Text";
import contributors from "config/mocks/contributors";
import repoUser from "config/mocks/user";
import styles from './Contributors.module.scss';

const Contributors: React.FC = () => {
    return (
        <div className={styles.root}>
            <Text view="p-18" className={styles.header}>Contributors</Text>
            <ul className={styles.list}>
                {contributors.map((user) => (
                    <li key={user.id}>
                        <img className={styles.avatar} src={user.avatar_url} alt={user.login} />
                        <Text view="p-16" className={styles.user}>{user.login}</Text> <Text view="p-16" color="secondary">{repoUser.name}</Text>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Contributors;