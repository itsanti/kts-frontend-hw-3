 
  export type RepoContributorApi = {
    id: number;
    login: string;
    url: string;
    avatar_url: string;
  };

  export type RepoContributorModel = {
    id: number;
    login: string;
    url: string;
    avatarUrl: string;
  };


  export const normalizeRepoContributor = (from: RepoContributorApi): RepoContributorModel => ({
    id: from.id,
    login: from.login,
    url: from.url,
    avatarUrl: from.avatar_url
  })