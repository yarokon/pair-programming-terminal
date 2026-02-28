import { Injectable } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';
import { simpleGit } from 'simple-git';

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
   * [] Call createFileTree
   * [] Handle 404 error
   */
  public async getFiles(owner: string, repoName: string): Promise<FileNode[]> {
    return [];
  }

  /**
   * TODO list:
   * [] Use cloneOrPullRepo
   * [] Return file content
   */
  public async getFileContent(
    owner: string,
    repoName: string,
    file: string,
  ): Promise<string> {
    return '';
  }

  /**
   * TODO list:
   * [] Clone repo
   * [] Pull repo if exists (use git.cwd to set working directory)
   */
  private async cloneOrPullRepo(
    owner: string,
    repoName: string,
  ): Promise<void> {
    const repoUrl = `https://github.com/${owner}/${repoName}.git`;
    const repoDir = path.join('repositories', owner, repoName); // FIXME: Use absolute path

    const git = simpleGit();
  }

  /**
   * TODO list:
   * [] implement createFileTree which returns FileNode[]
   * [] ignore .git directory
   */
  private async createFileTree(currentDir: string): Promise<FileNode[]> {
    const entries = await fs.promises.readdir(currentDir, {
      withFileTypes: true, // Use entry.isDirectory() and entry.name
    });

    return [];
  }
}
