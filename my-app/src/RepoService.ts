import type { SimpleGit } from 'simple-git';
import { DEFAULT_REPO_URL } from './constants.js';

class RepoService {
  constructor(private git: SimpleGit) {
    this.git = git;
  }

  async initRepo(repoPath: string = DEFAULT_REPO_URL): Promise<void> {
    await this.git.clone(repoPath);
  }
}

export default RepoService;
