import { observer } from 'mobx-react-lite';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Card from 'components/Card';
import Loader from 'components/Loader';
import Pager from 'components/Pager';
import Text from 'components/Text';
import StarIcon from 'components/icons/StarIcon';
import { ROUTES } from 'config/constants';
import { GitHubStore } from 'store/GitHubStore';
import { RepoItemModel } from 'store/models/gitHub';
import { dateFormat } from 'utils/index';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';
import Filter from './components/Filter';
import Search from './components/Search';
import styles from './RepoList.module.scss';

const RepoList: React.FC = () => {
    const gitHubStore = useLocalStore(() => new GitHubStore());
    const [params] = useSearchParams()
    const [page, setPage] = useState(0);
    const totalPages = useRef(0);
    const navigate = useNavigate()

    const cardClickHandler = (repo: RepoItemModel): void => {
        navigate(`${ROUTES.repops}/${repo.owner.login}/${repo.name}`);
    };

    useEffect(() => {
        const search = params.get('search') || 'ktsstudio';
        const type = params.get('type') || 'all';
        gitHubStore.getRepos(search, { page, per_page: 9, type: type }).then(() => {
            const linkHeader = gitHubStore.linkHeader;
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
    }, [gitHubStore, page, params]);

    if (!gitHubStore.repos) {
        return null;
    }

    return (
        <div className={styles.rootWrapper}>
            <section className={styles.root}>
                <Text tag='h1' className={styles.pageTitle}>List of organization repositories</Text>
                <Filter className={styles.repoType} store={gitHubStore} />
                <Search className={styles.search} store={gitHubStore} setPage={setPage} />
                {gitHubStore.meta === Meta.loading && <div className={styles.loader}><Loader /></div>}
                {gitHubStore.meta === Meta.success && <div className={styles.reposGrid}>
                    {gitHubStore.repos.map(repo => (
                        <Card key={repo.id} image={repo.owner.avatarUrl}
                            className={styles.card}
                            captionSlot={<Text tag='p' className={styles.captionSlot}>
                                <StarIcon className={styles.starIcon} width={14} height={14} />
                                {repo.stargazersCount} <span className={styles.updated_at}>Updated {dateFormat(repo.updatedAt)}</span>
                            </Text>}
                            title={repo.name}
                            subtitle={repo.description}
                            onClick={() => cardClickHandler(repo)}
                        />
                    ))}
                </div>}
                {totalPages.current > 0 && <div className={styles.pager} >
                    <Pager total={totalPages.current} currentPage={page} setPage={setPage} />
                </div>}
            </section>
        </div >
    );
};

export default observer(RepoList);