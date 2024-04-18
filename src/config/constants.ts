// const LangColors https://github.com/ktsstudio/kts-school-frontend

const REPO_TYPES = ['all', 'public', 'private', 'forks', 'sources', 'member'];

const ROUTES = {
  index: '/',
  repops: '/repos',
  repoByName: '/repos/:owner/:repo',
  noMatch: '*',
};

export { REPO_TYPES, ROUTES };
