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
   * [] Clone repo
   * [] Pull repo if exists
   * [] Call createFileTree
   * [] Handle 404 error
   */
  async getFiles(owner: string, repoName: string): Promise<FileNode[]> {
    const repositoriesDir = path.resolve(process.cwd(), 'repositories');

    const repoUrl = `https://github.com/${owner}/${repoName}.git`;
    const repoDir = path.join(repositoriesDir, owner, repoName);

    const git = simpleGit();

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

    return [];
  }
}
