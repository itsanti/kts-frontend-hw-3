import { makeObservable, action, computed, observable, runInAction } from "mobx";
import { API_ROOT } from "config/constants";
import { RepoContributorApi, RepoContributorModel, RepoItemApi, RepoItemModel, normalizeRepoContributor, normalizeRepoItem } from "store/models/gitHub";
import { axiosGet } from "utils/axios";
import { log } from "utils/log";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = '_repo' | '_meta' | '_contributors' | '_readme';

export default class GitHubPageStore implements ILocalStore {
    private _repo: RepoItemModel | null = null;
    private _meta: Meta = Meta.initial;
    private _contributors: RepoContributorModel[] | null = null;
    private _readme = '';

    constructor() {
        makeObservable<GitHubPageStore, PrivateFields>(this, {
            _repo: observable,
            _contributors: observable.ref,
            _readme: observable,
            _meta: observable,
            repo: computed,
            contributors: computed,
            readme: computed,
            meta: computed,
            getRepo: action,
            getRepoSuccess: action,
        });
      }

    get meta(): Meta {
        return this._meta;
    }

    get repo(): RepoItemModel | null {
        return this._repo;
    }

    get contributors(): RepoContributorModel[] | null {
        return this._contributors;
    }

    get readme(): string {
        return this._readme;
    }

    async getRepo(owner: string, currentRepo: string): Promise<void> {
        this._meta = Meta.loading;
        this._repo = null;
        this._contributors = null;
        this._readme = '';
       
        const response = await axiosGet<RepoItemApi>(`${API_ROOT}/repos/${owner}/${currentRepo}`);
        if (response.status === 200) {
            this.getRepoSuccess(response.data, owner, currentRepo);
        }
    }

    async getRepoSuccess (repo: RepoItemApi, owner: string, currentRepo: string): Promise<void> {
        this._meta = Meta.success;
        try {
            this._repo = normalizeRepoItem(repo);
            // TODO: move to separate store
            const contributorsResponse = await axiosGet<RepoContributorApi[]>(repo.contributors_url);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this._contributors = contributorsResponse.data.map(normalizeRepoContributor);

            runInAction(() => {
                axiosGet<string>(`${API_ROOT}/repos/${owner}/${currentRepo}/readme`, {
                    headers: { 'Accept': 'application/vnd.github.html+json' }
                }).then((readmeResponse) => {
                    this._readme  = readmeResponse.data;
                }).catch(() => {
                    log('Readme not exists on this repo');
                    this._readme = '';
                });
            })

        } catch (e) {
            log(e);
            this._meta = Meta.error;
            this._repo = null;
        }
    }

    destroy(): void {}
}