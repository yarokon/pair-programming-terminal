import fs from 'node:fs/promises';
import path from 'node:path';
import { Injectable } from '@nestjs/common';
import { simpleGit, SimpleGit } from 'simple-git';

const REPO_URL = 'https://github.com/yarokon/pair-programming-terminal.git';

type FileNode = {
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
};

type FSNode = {
  name: string;
  parentPath: string;
  path: string;
  isDirectory: () => boolean;
}

async function checkDirectoryExists(directoryPath) {
  try {
    await fs.access(directoryPath);
    console.log('Directory exists.');
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Directory does not exist.');
    } else {
      console.error('Error checking directory existence:', error);
    }
    return false;
  }
}

async function readNodeLevel(directoryPath: string): Promise<FileNode[]> {
  const nodes: FileNode[] = [];
  process.stdout.write('');
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });

  entries.forEach(async (element) => {

    if (element.isDirectory()) {
      const node: FileNode = {
        path: element.path,
        type: 'directory',
        children: await readNodeLevel(element.path)
      }

      nodes.push(node);
    }
    
    const node: FileNode = {
      path: element.path,
      type: 'file',
    }
    nodes.push(node);
  });

  return nodes;
}

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const dirPath = '/tmp/input-source'
    const git: SimpleGit = simpleGit(dirPath, { binary: 'git' });

    try {
      if (!checkDirectoryExists(dirPath)) {
        // await git.init();
        await git.clone(REPO_URL);
      }

      const entries = await readNodeLevel(dirPath);

      console.log(); // Promise<FileNode[]>
      return JSON.stringify(entries);
    } catch (e) {
      /* handle all errors here */
      return 'Error ' + e.message;
    }

    return 'Hello World2!';
  }
}

