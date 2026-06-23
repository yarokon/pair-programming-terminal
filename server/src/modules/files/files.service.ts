import { Injectable } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';
import { simpleGit } from 'simple-git';

// TODO: Change to discriminated union type
export type FileNode = {
  name: string;
  path: string;
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
    const repoDir = path.join(__dirname, '../../../', 'repositories', owner, repoName);
    
    await this.cloneRepo(repoDir, owner, repoName);

    const fileTree = await this.createFileTree(repoDir);

    console.log(fileTree);
    return fileTree;
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
  private async cloneRepo(repoDir: string, owner: string, repoName: string): Promise<void> {
    const repoUrl = `https://github.com/${owner}/${repoName}.git`;
  
    const git = simpleGit(); // https://github.com/steveukx/git-js
    
    try {
      await git.clone(repoUrl, repoDir);
    } catch (error) {
      // TODO: handle correct existing directory error
      await git.cwd(repoDir).pull();
    }
  }

  /**
   * TODO list:
   * [] implement createFileTree which returns FileNode[] (start with a simple version that only returns files in the root directory)
   * [] ignore .git directory
   * [] return relative path
   * [] sort (directories first) // entryA.name.localeCompare(entryB.name, 'en-US', { numeric: true, sensitivity: 'base' });
   */
  private async createFileTree(currentDir: string, parentPath: string = ''): Promise<FileNode[]> {
    const entries = await fs.promises.readdir(currentDir, {
      withFileTypes: true, // Use entry.isDirectory() and entry.name
    });

    console.log(currentDir);

    const fileTree: FileNode[] = [];

    for (const entry of entries) {
      if (entry.name === '.git') {
        continue;
      }

      const entityPath = path.join(parentPath, entry.name); 

      const fileTreeEntry: FileNode = { 
        name: entry.name,
        path: entityPath,
        type: entry.isDirectory() ? 'directory' : 'file',
      }

      
      if (entry.isDirectory()) {
        fileTreeEntry.children = await this.createFileTree(`${currentDir}/${entry.name}`, entityPath);
      }
      
      fileTree.push(fileTreeEntry);
    }
    
    return fileTree;
  }
}
