export type RepoOwnerApi = {
    login: string;
    avatar_url: string;
  };

  export type RepoOwnerModel = {
    login: string;
    avatarUrl: string;
  };

  export const normalizeRepoOwner = (from: RepoOwnerApi): RepoOwnerModel => ({
    login: from.login,
    avatarUrl: from.avatar_url,
  })