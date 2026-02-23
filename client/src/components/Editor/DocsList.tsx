type DocsListProps = {
  docs: string[];
  selected: string | null;
  onCreate: () => void;
  onClear: () => void;
  onSelect: (file: string) => void;
};

export function DocsList({ docs, selected, onCreate, onClear, onSelect }: DocsListProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
      }}
    >
      <button type="button" onClick={onCreate}>
        + New File
      </button>

      <button type="button" onClick={onClear} disabled={docs.length === 0}>
        - Delete All
      </button>

      {docs.map((file) => (
        <button
          key={file}
          type="button"
          onClick={() => onSelect(file)}
          style={{
            border: selected === file ? '1px solid #333' : '1px solid #ccc',
            background: selected === file ? '#f0f0f0' : '#fff',
          }}
        >
          {file}
        </button>
      ))}
    </div>
  );
}
