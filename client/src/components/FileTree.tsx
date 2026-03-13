import { Tree } from 'react-arborist';
import { useMemo } from 'react';
import { indexRoute } from '../router';
import type { FileNode } from '../../../server/src/modules/files/files.service';

type TreeNode = {
  id: string;
  name: string;
  children?: TreeNode[];
};

const toTreeData = (nodes: FileNode[]): TreeNode[] =>
  nodes.map((node) => ({
    id: node.path,
    name: node.name,
    ...(node.type === 'directory' && { children: toTreeData(node.children) }),
  }));

export function FileTree() {
  const files = indexRoute.useLoaderData();
  const treeData = useMemo(() => toTreeData(files), [files]);

  return (
    <div style={{ width: 240, height: '60vh', borderRight: '1px solid #333', overflow: 'auto' }}>
      <Tree data={treeData} />
    </div>
  );
}
