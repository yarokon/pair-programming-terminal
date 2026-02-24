export function EditorEmptyState() {
  return (
    <div
      style={{
        flex: 1,
        border: '1px solid #e6e6e6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
      }}
    >
      No files yet. Click + New File.
    </div>
  );
}
