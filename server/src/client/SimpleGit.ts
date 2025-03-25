import simpleGit from 'simple-git';
import { mkdir, rm } from 'fs/promises';

export async function cloneGitRepo(path: string, filePath: string): Promise<void> {
  try {
    await rm(filePath, { recursive: true, force: true });

    await mkdir(filePath);
    const git = simpleGit({ baseDir: filePath });

    await git.clone(path);
  } catch (error) {
    console.log(error);
    throw new Error('Could not clone');
  }
}

export async function projectStructure(baseDir: string): Promise<string> {
  try {
    console.log(baseDir, 'baseDir');
    const git = simpleGit({ baseDir });

    return await git.raw('ls-files');
  } catch (error) {
    console.log(error);
    throw new Error('Could not read files');
  }
}

export async function readFileByPath(baseDir: string, filePath: string): Promise<string> {
  try {
    const git = simpleGit({ baseDir });

    return await git.show(filePath);
  } catch (error) {
    console.log(error);
    throw new Error('Could not get content');
  }
}
