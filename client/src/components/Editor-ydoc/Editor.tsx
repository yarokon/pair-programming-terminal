import MonacoEditor from '@monaco-editor/react';
import type { editor as Monaco } from 'monaco-editor';
import { useState } from 'react';

import { DocsList } from './DocsList';
import { EditorEmptyState } from './EditorEmptyState';
import { useFiles } from './useFiles';
import { useMonacoBinding } from './useMonacoBinding';
import { UsersList } from './UsersList';

export function Editor() {
  const [editor, setEditor] = useState<Monaco.IStandaloneCodeEditor | null>(null);
  const { fileNames, selectedFile, setSelectedFile, createFile, clearFiles } = useFiles();

  useMonacoBinding(editor, selectedFile);

  return (
    <div
      style={{
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <DocsList
          docs={fileNames}
          selected={selectedFile}
          onCreate={createFile}
          onClear={clearFiles}
          onSelect={setSelectedFile}
        />

        <UsersList />
      </div>

      {/* Editor */}
      {fileNames.length === 0 ? (
        <EditorEmptyState />
      ) : (
        <div style={{ flex: 1, border: '1px solid #e6e6e6' }}>
          <MonacoEditor
            height="52vh"
            defaultLanguage="typescript"
            onMount={setEditor}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </div>
      )}
    </div>
  );
}
