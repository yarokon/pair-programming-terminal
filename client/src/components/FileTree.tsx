import { Tree } from 'react-arborist';
import { indexRoute } from '../router';

export function FileTree() {
  const treeData = indexRoute.useLoaderData();
  console.log(treeData);
  return (
    <div style={{ width: 320, height: '70vh', borderRight: '2px solid #d8d8d8', overflow: 'auto' }}>
      <Tree data={treeData} openByDefault={false} />
    </div>
  );
}
