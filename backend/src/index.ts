import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import fs from 'node:fs/promises';
import { simpleGit } from 'simple-git';

const app = new Hono();

// Add CORS middleware
app.use(
  '*',
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'], // Common Vite dev server ports
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});
app.get('/file', async (c) => {
  const path = c.req.query('path');
  console.log('path:', path);
  // nice to have: check if the repo is already in the temp folder
  // create a temp directory
  const repoUrl = 'https://github.com/yarokon/pair-programming-terminal';
  const alreadyExists = await fs
    .access('/tmp/repo')
    .then(() => true)
    .catch(() => false);
  const git = simpleGit({
    baseDir: alreadyExists ? '/tmp/repo/pair-programming-terminal' : '/tmp/repo',
  });
  if (!alreadyExists) {
    console.log('folder does not exists, cloning repo');
    const tempDir = await fs.mkdir('/tmp/repo');
    // clone repo to the temp folder
    await git.clone(repoUrl);
  } else {
    console.log('folder already exists, using previously cloned version');

    // TODO pull changes
    await git.fetch(repoUrl);
    await git.pull(repoUrl);
  }
  // read file contents
  try {
    const filePath = `/tmp/repo/pair-programming-terminal/${path}`;
    console.log('file path:', filePath);
    const fileBuffer = await fs.readFile(filePath);
    // respond with file contents
    const fileString = fileBuffer.toString();
    console.log('file contents:', fileString);
    return c.text(fileString);
  } catch (err) {
    c.status(404);
    return c.text('File not found!');
  }
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
