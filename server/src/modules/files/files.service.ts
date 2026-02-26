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

    const repositoriesDir = path.resolve(process.cwd(), 'repositories');
    const repoDir = path.join(repositoriesDir, owner, repoName);

    const result = await this.createFileTree(repoDir, []);

    console.log(result);


    return [];
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

    const git = simpleGit();


    if (fs.existsSync(repoDir)) {
      console.log("Repo exists, pulling...");
      await git.cwd(repoDir);
      await git.pull();
      
    } else {
      console.log("Repo doesn't exist, cloning...");
      await git.clone(repoUrl, repoDir);
    }



    

    return [];
  }



  /**
   * TODO list:
   * [] implement createFileTree which returns FileNode[]
   * [] ignore .git directory
   * [] use relative paths
   */
  private async createFileTree(currentDir: string, result: FileNode[]): Promise<FileNode[]> {
    const entries = await fs.promises.readdir(currentDir, {
      withFileTypes: true, // You can use entry.isDirectory() and entry.name
    });


    for(let i = 0; i < entries.length; i++) {
      let entry = entries[i];
      if (entry.isDirectory()) {
        result.push( ...await this.createFileTree(path.join(currentDir, entry.name), result));
      } else {
        let file:FileNode = {path: path.join(currentDir, entry.name), type: 'file'};
        result.push(file);
      }
    }

    console.log(entries);

    return result;
  }


}
