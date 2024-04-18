export { default } from './Contributors';

export type RepoUser = {
  login: string;
  name: string;
};

export type Contributor = {
  id: number;
  login: string;
  url: string;
  avatar_url: string;
};
