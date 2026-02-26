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
    return [];
  }

  /**
   * TODO list:
   * [] Clone repo
   * [] Pull repo if exists
   */
  private async cloneOrPullRepo(
    owner: string,
    repoName: string,
  ): Promise<void> {
    const repoUrl = `https://github.com/${owner}/${repoName}.git`;
    const repoDir = path.resolve('repositories', owner, repoName);

    const git = simpleGit();
  }

  /**
   * TODO list:
   * [] implement createFileTree which returns FileNode[]
   * [] ignore .git directory
   * [] use path.basename to extractfile/folder name from the path
   */
  private async createFileTree(currentDir: string): Promise<FileNode[]> {
    const entries = await fs.promises.readdir(currentDir, {
      withFileTypes: true, // Use entry.isDirectory() and entry.name
    });

    return [];
  }
}
