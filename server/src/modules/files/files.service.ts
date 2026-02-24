import { Injectable } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';
import { simpleGit } from 'simple-git';

// GET http://localhost:3000/files/todo-md/todo-md

// TODO: Change to discriminated union type
export type FileNode = {
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
};

@Injectable()
export class FilesService {
  /**
   * TODO list:
   * [] Use cloneOrPullRepo
   * [] Return file content
   */
  public async getFileContent(
    owner: string,
    repoName: string,
    filePath: string,
  ): Promise<string> {
    return '';
  }

  /**
   * TODO list:
   * [] Call createFileTree
   * [] Handle 404 error
   */
  public async getFiles(owner: string, repoName: string): Promise<FileNode[]> {
    await this.cloneOrPullRepo(owner, repoName);


    const currDir = ''
    await this.createFileTree(currDir)

    return []
  }

  /**
   * TODO list:
   * [] Clone repo
   * [] Pull repo if exists
   */
  private async cloneOrPullRepo(owner: string, repoName: string) {
    const repositoriesDir = path.resolve(process.cwd(), 'repositories');

    const repoUrl = `https://github.com/${owner}/${repoName}.git`;
    const repoDir = path.join(repositoriesDir, owner, repoName);

    const isRepoExists = fs.existsSync(repoDir)

    if (!isRepoExists) {
      return 'Repo already exists'
    }


    const git = simpleGit();

    git.clone(repoUrl, repoDir)
      .catch((err) => console.error('failed: ', err));


    return [];
  }

  /**
   * TODO list:
   * [] implement createFileTree which returns FileNode[]
   * [] ignore .git directory
   * [] use relative paths
   */
  private async createFileTree(currentDir: string): Promise<FileNode[]> {
    const entries = await fs.promises.readdir(currentDir, {
      withFileTypes: true, // You can use entry.isDirectory() and entry.name
    });

    const fileNode: FileNode[] = [];

    // loop entries

    //currNode
    // currNode entry.isDirectory ? 'directory' : 'file'
    // /



    return [];
  }
}
