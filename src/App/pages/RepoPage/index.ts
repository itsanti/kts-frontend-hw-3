export { default } from './RepoPage';

export type Organization = {
  login: string;
  avatar_url: string;
};

export type Repo = {
  name: string;
  organization: Organization;
  homepage?: string;
  topics: string[];
  forks_count: number;
  subscribers_count: number;
  stargazers_count: number;
  languages_url: string;
};
