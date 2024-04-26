export type RepoOrganizationApi = {
    login: string;
    avatar_url: string;
  };

  export type RepoOrganizationModel = {
    login: string;
    avatarUrl: string;
  };

  export const normalizeRepoOrganization = (from: RepoOrganizationApi): RepoOrganizationModel => ({
    login: from.login,
    avatarUrl: from.avatar_url,
  })