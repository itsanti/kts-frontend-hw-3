import { makeObservable, action, computed, observable, runInAction } from "mobx";
import { API_ROOT } from "config/constants";
import { CollectionModel, getInitialCollectionModel, linearizeCollection, normalizeCollection } from 'store/index';
import { RepoItemApi, RepoItemModel, normalizeRepoItem } from "store/models/gitHub";
import { axiosGet } from "utils/axios";
import { log } from "utils/log";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = '_repos' | '_linkHeader' | '_meta';

export default class GitHubStore implements ILocalStore {
    private _repos: CollectionModel<number, RepoItemModel> = {
        order: [],
        entities: {}
    };
    private _linkHeader: string = '';
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<GitHubStore, PrivateFields>(this, {
            _repos: observable.ref,
            _linkHeader: observable,
            _meta: observable,
            linkHeader: computed,
            repos: computed,
            getRepos: action
        });
      }

    get meta(): Meta {
        return this._meta;
    }

    get repos(): RepoItemModel[] {
        return linearizeCollection(this._repos);
    }

    get linkHeader(): string {
        return this._linkHeader;
    }

    async getRepos(org: string, params: { [key: string]: number | string }): Promise<void> {
        this._meta = Meta.loading;
        this._repos = getInitialCollectionModel();
       
        const response = await axiosGet<RepoItemApi[]>(`${API_ROOT}/orgs/${org}/repos`, {
            params
        });

        runInAction(() => {
            if (response.status === 200) {
                this._meta = Meta.success;
                try {
                    const repos: RepoItemModel[] = [];
                    for (const item of response.data) {
                        repos.push(normalizeRepoItem(item));
                    }
                    this._repos = normalizeCollection<number, RepoItemModel>(repos, (el) => el.id);
                    this._linkHeader = response.headers.link;
                } catch (e) {
                    log(e);
                    this._meta = Meta.error;
                    this._repos = getInitialCollectionModel();
                }
            }
        })
    }

    destroy(): void {}
}