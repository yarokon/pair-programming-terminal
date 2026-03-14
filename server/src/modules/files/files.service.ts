import { Injectable } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';
import { simpleGit } from 'simple-git';

// TODO: Change to discriminated union type
export type FileNode = {
  name: string;
  // path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
};

@Injectable()
export class FilesService {
  /**
   * TODO list:
   * [] Use cloneRepo
   * [] Call createFileTree
   */
  public async getFiles(owner: string, repoName: string): Promise<FileNode[]> {
    return [];
  }

  /**
   * TODO list:
   * [] Use cloneOrPullRepo
   * [] Return file content
   * [] Set appropriate content-type header
   * [] Handle 404 error
   */
  // public async getFileContent(
  //   owner: string,
  //   repoName: string,
  //   file: string,
  // ): Promise<string> {
  //   return '';
  // }

  /**
   * TODO list:
   * [] Clone repo
   * [] Handle error if clone repo second time fails
   */
  private async cloneRepo(owner: string, repoName: string): Promise<void> {
    const repoUrl = `https://github.com/${owner}/${repoName}.git`;
    const repoDir = path.join('repositories', owner, repoName); // TODO: Use absolute path

    const git = simpleGit(); // https://github.com/steveukx/git-js
  }

  /**
   * TODO list:
   * [] implement createFileTree which returns FileNode[] (start with a simple version that only returns files in the root directory)
   * [] ignore .git directory
   * [] return relative path
   * [] sort (directories first) // entryA.name.localeCompare(entryB.name, 'en-US', { numeric: true, sensitivity: 'base' });
   */
  private async createFileTree(currentDir: string): Promise<FileNode[]> {
    const entries = await fs.promises.readdir(currentDir, {
      withFileTypes: true, // Use entry.isDirectory() and entry.name
    });

    return [];
  }
}
