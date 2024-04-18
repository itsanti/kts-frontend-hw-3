import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import Icon from 'components/icons/Icon';
import LinkIcon from 'components/icons/LinkIcon';
import { ROUTES } from 'config/constants';
import readmeHtml from 'config/mocks/readme';
import ktsRepo from 'config/mocks/repo';
import Contributors from './components/Contributors';
import Languages from './components/Languages';
import RepoStat from './components/RepoStat';
import styles from './RepoPage.module.scss';

const RepoPage: React.FC = () => {
    return (
        <section className={styles.root}>
            <header className={styles.header}>
                <Link to={ROUTES.index}>
                    <Icon width={32} height={32} viewBox="0 0 32 32">
                        <path d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44" stroke="#1F883D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </Icon>
                </Link>
                <img className={styles.orgAvatar} src={ktsRepo.organization.avatar_url} alt={ktsRepo.organization.login} />
                <Text view='title'>{ktsRepo.name}</Text>
            </header>
            <div className={styles.subHeader}>
                <LinkIcon /><a className={styles.link} href={ktsRepo.homepage}>{ktsRepo.homepage.substring(8)}</a>
            </div>
            <ul className={styles.topics}>{ktsRepo.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
            ))}</ul>
            <section className={styles.repoStat}>
                <RepoStat forks_count={ktsRepo.forks_count} watchers_count={ktsRepo.watchers_count} stargazers_count={ktsRepo.stargazers_count} />
            </section>
            <section className={styles.repoDevInfo}>
                <Contributors />
                <Languages />
            </section>
            <section className={styles.readme}>
                <p>README.md</p>
                <div className={styles.readmeRaw} dangerouslySetInnerHTML={{ __html: readmeHtml }} />
            </section>
        </section >
    );
};

export default RepoPage;