import fs from 'fs/promises';
import path from 'node:path';
import { DEFAULT_REPO_NAME } from './constants.js';

export const checkIsFolderEmpty = async (path: string): Promise<boolean> => {
  try {
    const files = await fs.readdir(path);
    // console.log('files', files);
    return files.length === 0;
  } catch (error) {
    return true;
  }
};

type FileNode = {
  path: string;
} & ({ type: 'directory'; children: FileNode[] } | { type: 'file' });

export async function buildFileTree(dirPath: string): Promise<FileNode[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  if (entries.length === 0) {
    return [];
  }

  const nodes: FileNode[] = [];

  await Promise.all(
    entries.map(async (entry) => {
      const { name } = entry;

      if (entry.isDirectory()) {
        nodes.push({
          path: `${dirPath}/${name}`,
          type: 'directory',
          children: await buildFileTree(`${dirPath}/${name}`),
        });
      } else {
        nodes.push({
          path: `${dirPath}/${name}`,
          type: 'file',
        });
      }
    }),
  );

  return nodes;
}
