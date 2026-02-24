import { Editor } from './components/Editor';
import { FileTree } from './components/FileTree';
import { TerminalContextProvider } from 'react-terminal';
import { Terminal } from './components/Terminal';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <TerminalContextProvider>
        <div style={{ display: 'flex' }}>
          <FileTree />
          <Editor />
        </div>
        <Terminal />
      </TerminalContextProvider>
    </div>
  );
}

export default App;
