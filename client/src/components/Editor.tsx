import MonacoEditor from '@monaco-editor/react';
import { useEffect, useState } from 'react';

// https://github.com/suren-atoyan/monaco-react
export function Editor() {
  const urlParams = new URLSearchParams(window.location.search);
  const path = urlParams.get('path') || '';

  const apiUrl = 'http://localhost:3000/file';

  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (path) {
      setLoading(true);
      fetch(`${apiUrl}?path=${encodeURIComponent(path)}`)
        .then((response) => response.text())
        .then((data) => {
          setFileContent(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching file:', error);
          setLoading(false);
        });
    }
  }, [path]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <MonacoEditor
      height="60vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      value={fileContent}
    />
  );
}
