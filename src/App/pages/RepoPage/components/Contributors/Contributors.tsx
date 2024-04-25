import React, { useState, useEffect } from "react";
import Text from "components/Text";
import { RepoContributorModel, RepoUserModel, RepoUserApi, normalizeRepoUser } from "store/models/gitHub";
import { axiosGet } from "utils/axios";
import styles from './Contributors.module.scss';


const Contributors: React.FC<{ contributors: RepoContributorModel[] }> = ({ contributors }) => {
    const [repoUsers, setRepoUsers] = useState<RepoUserModel[]>([]);

    useEffect(() => {
        const getUserNames = async () => {
            if (!contributors) {
                return [];
            }
            const defs = contributors.map((user) => {
                return axiosGet<RepoUserApi>(user.url);
            });
            return await Promise.all(defs);
        };
        getUserNames().then((res) => setRepoUsers(res.map(user => normalizeRepoUser(user.data))));
    }, [contributors]);

    if (!contributors) {
        return null;
    }

    return (
        <div className={styles.root}>
            <div className={styles.title}><Text view="p-18" className={styles.header}>Contributors</Text>{contributors.length > 0 && <span className={styles.badge}>{contributors.length}</span>}</div>
            <ul className={styles.list}>
                {repoUsers.map((user) => (
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

export default Contributors;