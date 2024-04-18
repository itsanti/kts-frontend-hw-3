import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Text from 'components/Text';
import Icon from 'components/icons/Icon';
import LinkIcon from 'components/icons/LinkIcon';
import { API_TOCKEN, API_ROOT, ROUTES } from 'config/constants';
import Contributors from './components/Contributors';
import Languages from './components/Languages';
import RepoStat from './components/RepoStat';
import styles from './RepoPage.module.scss';
import { Repo } from '.';


const RepoPage: React.FC = () => {
    const { owner, repo: currentRepo } = useParams();

    const [contributors, setContributors] = React.useState([]);
    const [repo, setRepo] = React.useState<Repo | null>(null);
    const [readmeHtml, setReadmeHtml] = React.useState('');

    React.useEffect(() => {
        axios.get(`${API_ROOT}/repos/${owner}/${currentRepo}`, {
            headers: { 'Authorization': `Bearer ${API_TOCKEN}` }
        }).then(res => {
            setRepo(res.data);
            axios.get(res.data.contributors_url, {
                headers: { 'Authorization': `Bearer ${API_TOCKEN}` }
            }).then(res => {
                setContributors(res.data);
            });
            axios.get(`${API_ROOT}/repos/${owner}/${currentRepo}/readme`, {
                headers: { 'Authorization': `Bearer ${API_TOCKEN}`, 'Accept': 'application/vnd.github.html+json' }
            }).then(res => {
                setReadmeHtml(res.data);
            });
        });
    }, [owner, currentRepo]);

    if (!repo) {
        return null;
    }

    return (
        <section className={styles.root}>
            <header className={styles.header}>
                <Link to={ROUTES.index}>
                    <Icon width={32} height={32} viewBox="0 0 32 32">
                        <path d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44" stroke="#1F883D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </Icon>
                </Link>
                <img className={styles.orgAvatar} src={repo.organization.avatar_url} alt={repo.organization.login} />
                <Text view='title'>{repo.name}</Text>
            </header>
            {repo.homepage && <div className={styles.subHeader}>
                <LinkIcon /><a className={styles.link} href={repo.homepage}>{repo.homepage.substring(8)}</a>
            </div>}
            <ul className={styles.topics}>{repo.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
            ))}</ul>
            <section className={styles.repoStat}>
                <RepoStat forks_count={repo.forks_count} subscribers_count={repo.subscribers_count} stargazers_count={repo.stargazers_count} />
            </section>
            <section className={styles.repoDevInfo}>
                {contributors.length > 0 && <Contributors contributors={contributors} />}
                <Languages langUrl={repo.languages_url} />
            </section>
            {readmeHtml.length > 0 && <section className={styles.readme}>
                <p>README.md</p>
                <div className={styles.readmeRaw} dangerouslySetInnerHTML={{ __html: readmeHtml }} />
            </section>}
        </section >
    );
};

export default RepoPage;