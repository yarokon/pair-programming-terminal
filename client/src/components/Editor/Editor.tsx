import MonacoEditor from '@monaco-editor/react';
import type { editor as Monaco } from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import * as Y from 'yjs';
import { MonacoBinding } from 'y-monaco';

import { files, provider } from './collaboration';
import { DocsList } from './DocsList';
import { EditorEmptyState } from './EditorEmptyState';
import { UsersList } from './UsersList';

export function Editor() {
  const [editorInstance, setEditorInstance] = useState<Monaco.IStandaloneCodeEditor | null>(null);
  const bindingRef = useRef<MonacoBinding | null>(null);

  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  /**
   * Re-render UI when files change
   */
  useEffect(() => {
    const update = () => {
      const names = Array.from(files.keys());
      setFileNames(names);

      setSelectedFile((current) => {
        if (names.length === 0) {
          return null;
        }

        if (current && files.has(current)) {
          return current;
        }

        return names[0];
      });
    };

    files.observe(update);
    update();

    return () => files.unobserve(update);
  }, []);

  /**
   * Monaco ↔ Yjs binding lifecycle
   */
  useEffect(() => {
    const editor = editorInstance;
    const model = editor?.getModel();

    // always cleanup previous binding
    bindingRef.current?.destroy();
    bindingRef.current = null;

    if (!editor || !model || !selectedFile) {
      return;
    }

    const ytext = files.get(selectedFile);
    if (!ytext) {
      return;
    }

    bindingRef.current = new MonacoBinding(
      ytext,
      model,
      new Set([editor]),
      provider.awareness, // enables shared cursors later
    );

    return () => bindingRef.current?.destroy();
  }, [selectedFile, editorInstance]);

  /**
   * Create file
   */
  const handleCreate = () => {
    const name = `file-${files.size + 1}.ts`;

    const ytext = new Y.Text();
    ytext.insert(0, `// ${name}\n`);

    files.set(name, ytext);
    setSelectedFile(name);
  };

  /**
   * Remove all files
   */
  const handleClear = () => {
    files.clear();
    setSelectedFile(null);
  };

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
          onCreate={handleCreate}
          onClear={handleClear}
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
            onMount={(editor) => {
              setEditorInstance(editor);
            }}
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
