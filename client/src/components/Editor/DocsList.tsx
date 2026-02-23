import type React from 'react';

type DocsListProps = {
  docs: string[];
  selected: string | null;
  onCreate: () => void;
  onClear: () => void;
  onSelect: (file: string) => void;
};

export function DocsList({ docs, selected, onCreate, onClear, onSelect }: DocsListProps) {
  return (
    <div style={styles.root}>
      <button type="button" style={styles.actionBtn} onClick={onCreate}>
        ＋ New File
      </button>

      <button
        type="button"
        style={{
          ...styles.actionBtn,
          ...(docs.length === 0 ? styles.actionBtnDisabled : {}),
        }}
        onClick={onClear}
        disabled={docs.length === 0}
      >
        ✕ Delete All
      </button>

      {docs.length > 0 && <div style={styles.divider} />}

      {docs.map((file) => (
        <button
          key={file}
          type="button"
          style={styles.tab(selected === file)}
          onClick={() => onSelect(file)}
        >
          {file}
        </button>
      ))}
    </div>
  );
}

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap' as const,
    minHeight: 32,
  },
  actionBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '4px 10px',
    fontSize: 12,
    fontWeight: 500,
    border: '1px solid #d0d0d0',
    borderRadius: 6,
    background: '#f5f5f5',
    color: '#444',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  },
  actionBtnDisabled: {
    opacity: 0.35,
    cursor: 'not-allowed',
  },
  divider: {
    width: 1,
    height: 20,
    background: '#e0e0e0',
    margin: '0 6px',
    flexShrink: 0,
  },
  tab: (active: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    fontSize: 12,
    fontWeight: active ? 600 : 400,
    border: '1px solid',
    borderColor: active ? '#444' : '#d8d8d8',
    borderRadius: 6,
    background: active ? '#222' : '#fff',
    color: active ? '#fff' : '#666',
    cursor: active ? 'default' : 'pointer',
    boxShadow: active ? 'inset 0 1px 3px rgba(0,0,0,0.2)' : 'none',
  }),
};
