import { Injectable } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';
import { stat } from 'node:fs/promises';
import { simpleGit } from 'simple-git';

// const TYPE = {
//   FILE: 'file',
//   DIRECRORY: 'directory',
// } as const;

// TYPE[key]

// type FileNodeType = keyof (typeof TYPE)[keyof typeof TYPE];

// TODO: Change to discriminated union type
export type FileNode = {
  name: string;
  // path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
};

// type is file ? abc : abd

// type FileNodeOnly = {
//   name: string;
//   type: 'file' ;
// };

// const isFile = (file: FileNode) file is FileNodeOnly => {
//  entry.isDirectory()
// }

@Injectable()
export class FilesService {
  /**
   * TODO list:
   * [] Use cloneRepo
   * [] Call createFileTree
   */

  public async getFiles(owner: string, repoName: string): Promise<FileNode[]> {
    const currentDir = await this.cloneRepo(owner, repoName);
    return this.createFileTree(currentDir);
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

  private async fileExists(path: string) {
    try {
      await stat(path);
      return true;
    } catch (error) {
      throw error; // Rethrow other unexpected errors (e.g., permission issues)
    }
  }

  /**
   * TODO list:
   * [] Clone repo
   * [] Handle error if clone repo second time fails
   */
  private async cloneRepo(owner: string, repoName: string): Promise<string> {
    const repoUrl = `https://github.com/${owner}/${repoName}.git`;

    const absolutePath = path.resolve(`repositories/${owner}/${repoName}`);

    const repoAlreadyExists = await this.fileExists(absolutePath);

    if (repoAlreadyExists) {
      // throw new Error('This repo is already exist');
      console.log('This repo is already exist');
      return absolutePath;
    }
    const repoDir = path.join(absolutePath, owner, repoName); // TODO: Use absolute path

    const git = simpleGit(); // https://github.com/steveukx/git-js

    try {
      await git.clone(repoUrl, repoDir);
    } catch (error) {
      console.error(error);
    }

    return absolutePath;
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
      withFileTypes: true,
    });

    const folders = entries.filter((entry) => entry.isDirectory() && entry.name !== '.git');

    const files = entries.filter((entry) => !entry.isDirectory());

    const formatedFiles = files.map((file) => ({
      name: file.name,
      type: 'file' as const,
    }));

    let result: FileNode[] = [...formatedFiles];

    for (const folder of folders) {
      const fullPath = path.join(currentDir, folder.name);

      const subFolders = await this.createFileTree(fullPath);

      const formatedFolder = {
        name: folder.name as string,
        type: 'directory' as const,
        children: subFolders,
      };

      result.push(formatedFolder);
    }

    return result;
  }
}
