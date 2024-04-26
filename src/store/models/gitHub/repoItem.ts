
  import {RepoOrganizationApi, RepoOrganizationModel, RepoOwnerApi, RepoOwnerModel, normalizeRepoOrganization, normalizeRepoOwner} from ".";
    
  export type RepoItemApi = {
    id: number;
    owner: RepoOwnerApi;
    name: string;
    description: string;
    homepage?: string;
    topics: string[];
    forks_count: number;
    subscribers_count: number;
    stargazers_count: number;
    languages_url: string;
    updated_at: string;
    contributors_url: string;
    organization?: RepoOrganizationApi;
  };

  export type RepoItemModel = {
    id: number;
    owner: RepoOwnerModel;
    name: string;
    description: string;
    homepage?: string;
    topics: string[];
    forksCount: number;
    subscribersCount: number;
    stargazersCount: number;
    languagesUrl: string;
    updatedAt: string;
    contributorsUrl: string;
    organization?: RepoOrganizationModel;
  };

  export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
    id: from.id,
    owner: normalizeRepoOwner(from.owner),
    name: from.name,
    description: from.description,
    homepage: from.homepage,
    topics: from.topics,
    forksCount:from.forks_count,
    subscribersCount: from.subscribers_count,
    stargazersCount: from.stargazers_count,
    languagesUrl: from.languages_url,
    contributorsUrl: from.contributors_url,
    updatedAt: from.updated_at,
    organization: from.organization ? normalizeRepoOrganization(from.organization) : undefined
  });