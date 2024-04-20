import React, { useRef, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Input from 'components/Input';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import Pager from 'components/Pager';
import Icon from 'components/icons/Icon';
import StarIcon from 'components/icons/StarIcon';
import { API_ROOT, REPO_TYPES, ROUTES } from 'config/constants';
import { axiosGet } from 'utils/axios';
import { dateFormat } from 'utils/index';
import { Repo } from '../RepoPage';
import styles from './RepoList.module.scss';

const RepoList: React.FC = () => {
    const [value, setValue] = useState<Option[]>([]);
    const [valueSearh, setvalueSearh] = useState('');
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
                <MultiDropdown
                    options={REPO_TYPES.map(t => ({ key: t, value: t }))}
                    value={value}
                    onChange={(value) => setValue(value.length ? [value[0]] : [])}
                    getTitle={(values) => value.length < 1 ? "Type" : values.map(({ value }) => value).join(', ')}
                    className={styles.repoType}
                />
                <div className={styles.search}>
                    <Input className={styles.searchInput} onChange={setvalueSearh} value={valueSearh} placeholder='Enter organization name' />
                    <Button>
                        <Icon>
                            <g clipPath="url(#clip0_508_313)">
                                <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_508_313">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </Icon>
                    </Button>
                </div>
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