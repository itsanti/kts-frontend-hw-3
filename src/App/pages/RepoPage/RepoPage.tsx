import MarkdownPreview from '@uiw/react-markdown-preview';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ButtonBack from 'components/ButtonBack';
import Text from 'components/Text';
import LinkIcon from 'components/icons/LinkIcon';
import { GitHubPageStore } from 'store/GitHubStore';
import { useLocalStore } from 'utils/useLocalStore';
import Contributors from './components/Contributors';
import Languages from './components/Languages';
import RepoStat from './components/RepoStat';
import styles from './RepoPage.module.scss';

const RepoPage: React.FC = () => {
    const { owner, repo: currentRepo } = useParams();
    const gitHubPageStore = useLocalStore(() => new GitHubPageStore());

    useEffect(() => {
        gitHubPageStore.getRepo(owner as string, currentRepo as string);
    }, [owner, currentRepo, gitHubPageStore]);

    if (!gitHubPageStore.repo) {
        return null;
    }

    return (
        <section className={styles.root}>
            <header className={styles.header}>
                <ButtonBack />
                <img className={styles.orgAvatar} src={gitHubPageStore.repo.organization?.avatarUrl} alt={gitHubPageStore.repo.organization?.login} />
                <Text view='title'>{gitHubPageStore.repo.name}</Text>
            </header>
            {gitHubPageStore.repo.homepage && <div className={styles.subHeader}>
                <LinkIcon /><a target='_blank' rel='noreferrer' className={styles.link} href={gitHubPageStore.repo.homepage}>{gitHubPageStore.repo.homepage.substring(8)}</a>
            </div>}
            <ul className={styles.topics}>{gitHubPageStore.repo.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
            ))}</ul>
            <section className={styles.repoStat}>
                <RepoStat forksCount={gitHubPageStore.repo.forksCount} subscribersCount={gitHubPageStore.repo.subscribersCount} stargazersCount={gitHubPageStore.repo.stargazersCount} />
            </section>
            <section className={styles.repoDevInfo}>
                {gitHubPageStore.contributors && gitHubPageStore.contributors.length > 0 && <Contributors contributors={gitHubPageStore.contributors} />}
                <Languages langUrl={gitHubPageStore.repo.languagesUrl} />
            </section>
            {gitHubPageStore.readme && <section className={styles.readme}>
                <p>README.md</p>
                <MarkdownPreview source={gitHubPageStore.readme} wrapperElement={{
                    "data-color-mode": "light"
                }} className={styles.readmeRaw} />
            </section>}
        </section>
    );
};

export default observer(RepoPage);