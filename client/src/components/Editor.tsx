import MonacoEditor from '@monaco-editor/react';

// https://github.com/suren-atoyan/monaco-react
export function Editor() {
  return <MonacoEditor height="60vh" defaultLanguage="javascript" defaultValue="// some comment" />;
}
