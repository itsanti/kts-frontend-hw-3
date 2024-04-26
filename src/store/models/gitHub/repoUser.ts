export type RepoUserApi = {
    id: number;
    login: string;
    name: string;
    url: string;
    avatar_url: string;
  };

  export type RepoUserModel = {
    id: number;
    login: string;
    name: string;
    url: string;
    avatarUrl: string;
  };
  
  export const normalizeRepoUser = (from: RepoUserApi): RepoUserModel => ({
    id: from.id,
    login: from.login,
    name: from.name,
    url: from.url,
    avatarUrl: from.avatar_url
  })