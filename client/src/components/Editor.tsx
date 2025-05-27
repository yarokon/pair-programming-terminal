import MonacoEditor from '@monaco-editor/react';
import { useEffect, useState } from 'react';

function useRun() {
  const [output, setOutput] = useState('lorem');

  const run = async () => {
    debugger;
    const res = await fetch('http://localhost:8080/run-workflow');
    const json = await res.json();
    setOutput(json.stdout);
  };

  return { output, run };
}

// museum-tickets.arazzo.yaml

function useContents() {
  const [content, setContent] = useState('');
  useEffect(() => {
    const init = async () => {
      const res = await fetch('http://localhost:8080/file/museum-tickets.arazzo.yaml');
      const json = await res.json();
      setContent(json.data);
    };
    init();
  }, []);
  return { content };
}

// https://github.com/suren-atoyan/monaco-react
export function Editor() {
  const { output, run } = useRun();
  const { content } = useContents();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
      <div style={{ borderRight: '1px solid red' }}>
        <button onClick={run}>Run workflow</button>
        <MonacoEditor
          value={content}
          height="60vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
        />
        ;
      </div>
      <pre>{output}</pre>
    </div>
  );
}
