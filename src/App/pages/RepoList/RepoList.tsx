import React, { useRef, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Card from 'components/Card';
import Pager from 'components/Pager';
import StarIcon from 'components/icons/StarIcon';
import { API_ROOT, ROUTES } from 'config/constants';
import { axiosGet } from 'utils/axios';
import { dateFormat } from 'utils/index';
import { Repo } from '../RepoPage';
import Filter from './components/Filter';
import Search from './components/Search';
import styles from './RepoList.module.scss';

const RepoList: React.FC = () => {
    const [repos, setRepos] = useState<Repo[] | null>(null);
    const [params] = useSearchParams()
    const [page, setPage] = useState(0);
    const totalPages = useRef(0);

    useEffect(() => {
        axiosGet(`${API_ROOT}/orgs/ktsstudio/repos`, {
            params: { page, per_page: 9 }
        }).then(res => {
            setRepos(res.data);
            const linkHeader = res.headers.link;
            if (linkHeader && linkHeader.includes(`rel="last"`)) {
                const pages = linkHeader.match(/, .*\/repos\?page=(\d+).*rel="last"$/);
                if (pages && totalPages.current === 0) {
                    totalPages.current = parseInt(pages[1]);
                    if (params.get('page')) {
                        setPage(parseInt(params.get('page') as string));
                    } else {
                        setPage(1)
                    }
                };
            }
        });
    }, [page, params]);

    if (!repos) {
        return null;
    }

    return (
        <div className={styles.rootWrapper}>
            <section className={styles.root}>
                <h1 className={styles.pageTitle}>List of organization repositories</h1>
                <Filter className={styles.repoType} />
                <Search className={styles.search} />
                <div className={styles.reposGrid}>
                    {repos.map(repo => (
                        <Link
                            key={repo.id}
                            to={`${ROUTES.repops}/${repo.owner.login}/${repo.name}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Card image={repo.owner.avatar_url}
                                className={styles.card}
                                captionSlot={<p className={styles.captionSlot}>
                                    <StarIcon className={styles.starIcon} width={14} height={14} />
                                    {repo.stargazers_count} <span className={styles.updated_at}>Updated {dateFormat(repo.updated_at)}</span>
                                </p>}
                                title={repo.name}
                                subtitle={repo.description}
                            />
                        </Link>
                    ))}
                </div>
                {totalPages.current > 0 && <div className={styles.pager} >
                    <Pager total={totalPages.current} currentPage={page} setPage={setPage} />
                </div>}
            </section>
        </div >
    );
};

export default RepoList;