import { makeObservable, action, computed, observable, runInAction } from "mobx";
import { API_ROOT } from "config/constants";
import { RepoItemApi, RepoItemModel, normalizeRepoItem } from "store/models/gitHub";
import { axiosGet } from "utils/axios";
import { log } from "utils/log";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";
import {GitHubContributorsStore} from '.'


type PrivateFields = '_repo' | '_meta' | '_readme' | '_contributorsStore';

export default class GitHubPageStore implements ILocalStore {
    private _repo: RepoItemModel | null = null;
    private _meta: Meta = Meta.initial;
    private _contributorsStore: GitHubContributorsStore | null = null;
    private _readme = '';

    constructor() {
        makeObservable<GitHubPageStore, PrivateFields>(this, {
            _repo: observable.ref,
            _contributorsStore: observable,
            _readme: observable,
            _meta: observable,
            repo: computed,
            readme: computed,
            meta: computed,
            getRepo: action,
            loadReadme: action,
        });
      }

    get meta(): Meta {
        return this._meta;
    }

    get repo(): RepoItemModel | null {
        return this._repo;
    }

    get contributors() {
        if (this._contributorsStore?.contributors) {
            return this._contributorsStore?.contributors;
        }
        return [];
    }

    get readme(): string {
        return this._readme;
    }

    async getRepo(owner: string, currentRepo: string): Promise<void> {
        this._meta = Meta.loading;
        this._repo = null;
        this._readme = '';
       
        const response = await axiosGet<RepoItemApi>(`${API_ROOT}/repos/${owner}/${currentRepo}`);
        
        runInAction(() => {
            if (response.status === 200) {
                try {
                    this._meta = Meta.success;
                    this._repo = normalizeRepoItem(response.data);
                    this._contributorsStore =  new GitHubContributorsStore(this._repo.contributorsUrl);
                    this._contributorsStore.getContributors();
                    this.loadReadme(owner, currentRepo);
                } catch (e) {
                    log(e);
                    this._meta = Meta.error;
                    this._repo = null;
                }
            }

        })
    }

    async loadReadme(owner: string, currentRepo: string): Promise<void> {
        const readmeResponse = await axiosGet<string>(`${API_ROOT}/repos/${owner}/${currentRepo}/readme`, {
            headers: { 'Accept': 'application/vnd.github.html+json' }});
            runInAction(() => {
                this._readme  = readmeResponse.data;
            })
    }

    destroy(): void {
        this._contributorsStore?.destroy();
    }
}