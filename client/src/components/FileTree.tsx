import { Tree } from 'react-arborist';
import { indexRoute } from '../router';
import type { FileNode } from '../../../server/src/modules/files/files.service';

function toTreeData(
  nodes: FileNode[],
  parentPath = '',
): { id: string; name: string; children?: ReturnType<typeof toTreeData> }[] {
  return nodes.map((node) => {
    const id = parentPath ? `${parentPath}/${node.path}` : node.path;

    return {
      id,
      name: node.path,
      ...(node.children ? { children: toTreeData(node.children, id) } : {}),
    };
  });
}

export function FileTree() {
  const files = indexRoute.useLoaderData();
  const treeData = toTreeData(files);

  return (
    <div style={{ width: 240, height: '60vh', borderRight: '1px solid #333', overflow: 'auto' }}>
      <Tree data={treeData} />
    </div>
  );
}
