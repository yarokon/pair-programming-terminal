import { Tree } from 'react-arborist';

export function FileTree() {
  return (
    <div style={{ width: 240, height: '60vh', borderRight: '1px solid #333', overflow: 'auto' }}>
      <Tree data={[]} />
    </div>
  );
}
