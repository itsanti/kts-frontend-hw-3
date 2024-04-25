export { default } from './Contributors';

export type RepoUser = {
  id: number;
  login: string;
  name: string;
  url: string;
  avatar_url: string;
};

export type Contributor = {
  id: number;
  login: string;
  url: string;
  avatar_url: string;
};
