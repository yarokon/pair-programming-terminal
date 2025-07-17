import express from 'express';
import { cloneGitRepo, projectStructure, readFileByPath } from './client/SimpleGit';

const app = express();
const port = 3000;

const GIT_PATH = 'git@github.com:yarokon/pair-programming-terminal.git';
const BASE_DIR = '/tmp/repo/pair-programming-terminal';
const FILE_PATH = 'HEAD:client/.gitignore';

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Clone repository endpoint
app.post('/clone', async (req, res) => {
  try {
    await cloneGitRepo(GIT_PATH, BASE_DIR);
    res.json({
      success: true,
      message: 'Repository cloned successfully',
      repo: GIT_PATH,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to clone repository',
    });
  }
});

app.get('/project-structure', async (req, res) => {
  try {
    const stringProjectStructure: string = await projectStructure(BASE_DIR);
    const filesPaths: string[] = stringProjectStructure.split('\n').filter(Boolean);

    res.json({
      success: true,
      filesPaths,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get project structure',
    });
  }
});

app.get('/content', async (req, res) => {
  try {
    const content: string = await readFileByPath(
      BASE_DIR,
      (req.query as { filePath: string }).filePath,
    );

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get project structure',
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
