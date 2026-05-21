import { Injectable } from '@nestjs/common';
import fs, { Dirent } from 'node:fs';
import path from 'node:path';
import { simpleGit } from 'simple-git';

// TODO: Change to discriminated union type
export type FileNode = {
  name: string;
  // path: string;
  type: 'file'
} | {
  name: string;
  // path: string;
  type: 'directory';
  children: FileNode[];
};

@Injectable()
export class FilesService {
  /**
   * TODO list:
   * [] Use cloneRepo
   * [] Call createFileTree
   */
  public async getFiles(owner: string, repoName: string): Promise<FileNode[]> {

    const dir = await this.cloneRepo(owner, repoName)

    const tree = await this.createFileTree(dir)

    return tree;
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
  private async cloneRepo(owner: string, repoName: string): Promise<string> {
    const repoUrl = `https://github.com/${owner}/${repoName}.git`;

    const repoDir = path.resolve('repositories', owner, repoName); // TODO: Use absolute path

    console.log('repoDir',repoDir)

    const git = simpleGit(); // https://github.com/steveukx/git-js


    if (fs.existsSync(repoDir)) {
        console.log('Path exists!');
        await git.cwd(repoDir).pull(repoUrl)
    } else{
      const response = await git.clone(repoUrl, repoDir)
      console.log('response', response)
    } 

    return repoDir
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
    const tree:FileNode[] = []

    entries.forEach(el => {
      if(el.isFile()){
        tree.push({
          name: el.name,
          type: 'file'
        })
      }else if (el.isDirectory()){
        // const files = await this.parseTreeToFile(path.join(el.parentPath, el.name))
        tree.push({
          name: el.name,
          type: 'directory',
          children: []
        })
      } else {

      }
    })



    return tree;
  }

  // private async parseTreeToFile(dir: string): Promise<> {
  //   const entries = await fs.promises.readdir(dir, {
  //     withFileTypes: true, // Use entry.isDirectory() and entry.name
  //   });
  //   const tree:FileNode[] = []

    

  // }
}
