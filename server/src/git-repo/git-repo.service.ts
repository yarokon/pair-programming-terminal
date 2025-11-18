import { Injectable } from '@nestjs/common';
import { readdir } from 'node:fs/promises';
import { simpleGit, SimpleGit } from 'simple-git';

type FileNode = {
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
};

@Injectable()
export class GitRepoService {
  git: SimpleGit = simpleGit('repos');

  private readonly defaultRepo =
    'https://github.com/yarokon/pair-programming-terminal.git';

  private readonly defaultRepoName = './repos/pair-programming-terminal';

  constructor() {
    this.clone().then();
    this.getRepo().then();
  }

  async clone() {
    // TODO: get metadata -> store in DB
    await this.git.clone(this.defaultRepo);
  }

  async getRepo(): Promise<FileNode[]> {
    const entries = await readdir(this.defaultRepoName, {
      withFileTypes: true,
    });

    console.log(entries);

    return Promise.all(entries.map((x) => this.getItem(x)));
  }

  private async getItem(dir): Promise<FileNode> {
    const type = dir.isDirectory() ? 'file' : 'directory';
    const dirs =
      type === 'directory'
        ? await readdir(`${dir.path}/${dir.name}`, {
            withFileTypes: true,
          })
        : undefined;

    return {
      path: dir.name,
      type,
      children: dirs
        ? await Promise.all(dirs.map((x) => this.getItem(x)))
        : undefined,
    };
  }
}
