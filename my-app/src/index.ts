import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { type SimpleGit, simpleGit } from 'simple-git';
import RepoService from './RepoService.js';
import { buildFileTree, checkIsFolderEmpty } from './utils.js';
import { DEFAULT_REPO_NAME } from './constants.js';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(cors());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/tree', async (c) => {
  const initRepo = async () => {
    const git: SimpleGit = simpleGit('/tmp', {
      binary: 'git',
    });
    const service = new RepoService(git);
    await service.initRepo();
  };

  if (await checkIsFolderEmpty(`/tmp/${DEFAULT_REPO_NAME}`)) {
    await initRepo();
  }

  const res = await buildFileTree(`/tmp/${DEFAULT_REPO_NAME}`);

  return c.json(res);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
