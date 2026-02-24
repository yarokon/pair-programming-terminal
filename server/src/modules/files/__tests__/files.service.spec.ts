import fs from 'node:fs';
import path from 'node:path';
import { simpleGit } from 'simple-git';
import { FilesService } from '../files.service';

jest.mock('simple-git', () => ({
  simpleGit: jest.fn(() => ({
    cwd: jest.fn().mockReturnThis(),
    pull: jest.fn().mockResolvedValue(undefined),
    clone: jest.fn().mockResolvedValue(undefined),
  })),
}));

describe('FilesService', () => {
  const repositoriesDir = path.resolve(process.cwd(), 'repositories');
  const repoDir = path.join(repositoriesDir, 'todo-md', 'todo-md');

  beforeEach(() => {
    fs.mkdirSync(repoDir, { recursive: true });
    fs.writeFileSync(path.join(repoDir, 'README.md'), '# test');
    fs.mkdirSync(path.join(repoDir, 'src'), { recursive: true });
    fs.writeFileSync(path.join(repoDir, 'src', 'index.ts'), 'export {};');
  });

  afterEach(() => {
    fs.rmSync(repositoriesDir, { recursive: true, force: true });
    jest.clearAllMocks();
  });

  it('returns a list of files', async () => {
    const service = new FilesService();

    const result = await service.getFiles('todo-md', 'todo-md');

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(simpleGit).toHaveBeenCalled();
  });
});
