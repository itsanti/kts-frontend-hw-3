import { observer } from 'mobx-react-lite';
import React, { useEffect } from "react";
import Text from "components/Text";
import { GitHubUserStore } from "store/GitHubStore";
import { RepoContributorModel } from "store/models/gitHub";
import { useLocalStore } from "utils/useLocalStore";
import styles from './Contributors.module.scss';


const Contributors: React.FC<{ contributors: RepoContributorModel[] }> = ({ contributors }) => {
    const gitHubUserStore = useLocalStore(() => new GitHubUserStore(contributors));

    useEffect(() => {
        gitHubUserStore.getUserNames();
    }, [gitHubUserStore]);

    if (!gitHubUserStore.users.length) {
        return null;
    }

    return (
        <div className={styles.root}>
            <div className={styles.title}><Text view="p-18" className={styles.header}>Contributors</Text>{contributors.length > 0 && <span className={styles.badge}>{contributors.length}</span>}</div>
            <ul className={styles.list}>
                {gitHubUserStore.users.map((user) => (
                    <li key={user.id}>
                        <img className={styles.avatar} src={user.avatarUrl} alt={user.login} />
                        <Text view="p-16" className={styles.user}>{user.login}</Text>
                        <Text view="p-16" color="secondary">{user.name}</Text>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default observer(Contributors);