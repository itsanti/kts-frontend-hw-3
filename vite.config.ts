import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfig from './tsconfig.json';

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const webpackConfigAliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, paths]) => {
    const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');

    webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
  });

  return webpackConfigAliases;
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...loadEnv(mode, process.cwd()) };

  return {
    define: {
      APP_ENV: process.env,
    },
    plugins: [
      react({
        include: '**/*.tsx',
      }),
    ],
    resolve: {
      alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
  };
});
