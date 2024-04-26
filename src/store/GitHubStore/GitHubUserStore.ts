import { makeObservable, action, observable, computed, runInAction } from "mobx";
import { RepoContributorModel, RepoUserApi, RepoUserModel,  normalizeRepoUser } from "store/models/gitHub";
import { axiosGet } from "utils/axios";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = '_users' | '_meta';

export default class GitHubUserStore implements ILocalStore {

    private _contributors: RepoContributorModel[] = [];
    private _users: RepoUserModel[] = [];
    private _meta: Meta = Meta.initial;

    constructor(contributors: RepoContributorModel[]) {
        makeObservable<GitHubUserStore, PrivateFields>(this, {
            _meta: observable,
            _users: observable,
            users: computed,
            getUserNames: action
        });
        this._contributors = contributors;
      }

    get meta(): Meta {
        return this._meta;
    }

    get users(): RepoUserModel[] {
        return this._users;
    }

    async getUserNames() {
        if (!this._contributors) {
            return [];
        }
        this._meta = Meta.loading;
        const defs = this._contributors.map((user) => {
            return axiosGet<RepoUserApi>(user.url);
        });
        const response = await Promise.all(defs);
       
        runInAction(() => {
            this._meta = Meta.success;
            this._users = response.map(resp => normalizeRepoUser(resp.data))
        })
    };
   

    destroy(): void {}
}