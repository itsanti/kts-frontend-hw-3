export { default } from './RepoPage';

export type Owner = {
  login: string;
  avatar_url: string;
};

export type Organization = {
  login: string;
  avatar_url: string;
};

export type Repo = {
  id: number;
  owner: Owner;
  name: string;
  description: string;
  organization: Organization;
  homepage?: string;
  topics: string[];
  forks_count: number;
  subscribers_count: number;
  stargazers_count: number;
  languages_url: string;
  updated_at: string;
};
