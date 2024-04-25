const API_ROOT = 'https://api.github.com';
const API_TOCKEN = window.APP_ENV?.VITE_API_TOCKEN;

const REPO_TYPES = ['all', 'public', 'private', 'forks', 'sources', 'member'];

const ROUTES = {
  index: '/',
  repops: '/repos',
  repoByName: '/repos/:owner/:repo',
  noMatch: '*',
};

export { API_TOCKEN, API_ROOT, REPO_TYPES, ROUTES };
