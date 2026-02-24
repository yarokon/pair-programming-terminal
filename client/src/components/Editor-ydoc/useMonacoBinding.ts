import { useEffect, useRef } from 'react';
import type { editor as Monaco } from 'monaco-editor';
import { MonacoBinding } from 'y-monaco';

import { files, provider } from './collaboration';

export function useMonacoBinding(
  editor: Monaco.IStandaloneCodeEditor | null,
  selectedFile: string | null,
) {
  const bindingRef = useRef<MonacoBinding | null>(null);

  useEffect(() => {
    const model = editor?.getModel();

    bindingRef.current?.destroy();
    bindingRef.current = null;

    if (!editor || !model || !selectedFile) {
      return;
    }

    const ytext = files.get(selectedFile);
    if (!ytext) {
      return;
    }

    bindingRef.current = new MonacoBinding(ytext, model, new Set([editor]), provider.awareness);

    return () => {
      bindingRef.current?.destroy();
      bindingRef.current = null;
    };
  }, [editor, selectedFile]);
}
