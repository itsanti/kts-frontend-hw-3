import MarkdownPreview from '@uiw/react-markdown-preview';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ButtonBack from 'components/ButtonBack';
import Text from 'components/Text';
import LinkIcon from 'components/icons/LinkIcon';
import { API_ROOT } from 'config/constants';
import { axiosGet } from 'utils/axios';
import { log } from 'utils/log';
import Contributors from './components/Contributors';
import Languages from './components/Languages';
import RepoStat from './components/RepoStat';
import styles from './RepoPage.module.scss';
import { Repo } from '.';

const RepoPage: React.FC = () => {
    const { owner, repo: currentRepo } = useParams();

    const [contributors, setContributors] = useState([]);
    const [repo, setRepo] = useState<Repo | null>(null);
    const [readmeHtml, setReadmeHtml] = useState('');

    useEffect(() => {
        axiosGet(`${API_ROOT}/repos/${owner}/${currentRepo}`).then(res => {
            setRepo(res.data);
            axiosGet(res.data.contributors_url).then(res => {
                setContributors(res.data);
            });
            axiosGet(`${API_ROOT}/repos/${owner}/${currentRepo}/readme`, {
                headers: { 'Accept': 'application/vnd.github.html+json' }
            }).then(res => {
                setReadmeHtml(res.data);
            }).catch(() => {
                log('Readme not exists on this repo');
            });
        });
    }, [owner, currentRepo]);

    if (!repo) {
        return null;
    }

    return (
        <section className={styles.root}>
            <header className={styles.header}>
                <ButtonBack />
                <img className={styles.orgAvatar} src={repo.organization.avatar_url} alt={repo.organization.login} />
                <Text view='title'>{repo.name}</Text>
            </header>
            {repo.homepage && <div className={styles.subHeader}>
                <LinkIcon /><a target='_blank' rel='noreferrer' className={styles.link} href={repo.homepage}>{repo.homepage.substring(8)}</a>
            </div>}
            <ul className={styles.topics}>{repo.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
            ))}</ul>
            <section className={styles.repoStat}>
                <RepoStat forksCount={repo.forks_count} subscribersCount={repo.subscribers_count} stargazersCount={repo.stargazers_count} />
            </section>
            <section className={styles.repoDevInfo}>
                {contributors.length > 0 && <Contributors contributors={contributors} />}
                <Languages langUrl={repo.languages_url} />
            </section>
            {readmeHtml.length > 0 && <section className={styles.readme}>
                <p>README.md</p>
                <MarkdownPreview source={readmeHtml} wrapperElement={{
                    "data-color-mode": "light"
                }} className={styles.readmeRaw} />
            </section>}
        </section >
    );
};

export default RepoPage;