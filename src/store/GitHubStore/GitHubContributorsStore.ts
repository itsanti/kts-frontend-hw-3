import { makeObservable, action, observable, computed, runInAction } from "mobx";
import { normalizeRepoContributor , RepoContributorApi, RepoContributorModel } from "store/models/gitHub";

import { axiosGet } from "utils/axios";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = '_url' | '_contributors' | '_meta';

export default class GitHubContributorsStore implements ILocalStore {

    private _url: string = '';
    private _contributors: RepoContributorModel[] | null = null;
    private _meta: Meta = Meta.initial;

    constructor(url: string) {
        makeObservable<GitHubContributorsStore, PrivateFields>(this, {
            _url: observable,
            _meta: observable,
            _contributors: observable,
            meta: computed,
            contributors: computed,
            getContributors: action
        });
        this._url = url;
      }

    get meta(): Meta {
        return this._meta;
    }

    get contributors(): RepoContributorModel[] | null {
        return this._contributors;
    }

    async getContributors() {
        
        this._meta = Meta.loading;
        
        const response = await axiosGet<RepoContributorApi[]>(this._url);
       
        runInAction(() => {
            if (response.status === 200) {
                this._meta = Meta.success;
                this._contributors = response.data.map(contributor => normalizeRepoContributor(contributor));
            }
        })
    };
   

    destroy(): void {}
}