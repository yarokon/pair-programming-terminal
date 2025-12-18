import express from 'express';
import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';


import fs from 'node:fs/promises';
import path from 'node:path';

const options: Partial<SimpleGitOptions> = {
    baseDir: `${process.cwd()}/repository`,
    binary: 'git'
};

const git: SimpleGit = simpleGit(options);


const router = express.Router();


type FileNode = {
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
};


async function createFileTree(dirPath: string, repoName: string): Promise<FileNode[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true }); // entry.isDirectory()
  const repoDir = entries.find(en => en.name === repoName);

  if (!repoDir) {
    throw new Error('Repo not found')
  }

  const isDir = repoDir.isDirectory();

  if (isDir) {
    const fullDirPath = dirPath + '/' + repoDir.name;
    console.log('fullDirPath', fullDirPath)
    const entries = await fs.readdir(fullDirPath, { withFileTypes: true }); // entry.isDirectory()

    console.log('entries', entries)
  }

}

const checkIfRepoCloned = async (folderName: string) => {
    const folderPath = path.dirname('repository' + folderName);
    console.log('folder', folderPath);
    const reportExsits = await fs.access(folderPath, fs.constants.F_OK);
    console.log('reportExsits', reportExsits)

    return reportExsits;
}

const extractFolderName = (remoteUrl: string) => {
    // @ts-ignore
    const splittePath = remoteUrl.split('/');
    const lastItem = splittePath[4];
    return lastItem.replace('.git', '');
}

router.get("/get-files", async (req, res) => {
    console.log('starting to clone repo');
    const { body = {} } = req;
    const url = body.repositoryName || 'https://github.com/yarokon/pair-programming-terminal.git';
    const folderName = extractFolderName(url);
    const repoCloned = await checkIfRepoCloned(folderName);


    const files = await createFileTree('./repository', folderName);

    res.send("success");
});

export default router;
