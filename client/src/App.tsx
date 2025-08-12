import { Editor } from './components/Editor';
import { TerminalContextProvider } from 'react-terminal';
import { Terminal } from './components/Terminal';
import FIleTree from './components/FileTree';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <TerminalContextProvider>
        <div style={{ display: 'flex', gap: '16px' }}>
          <FIleTree />
          <Editor />
        </div>

        <Terminal />
      </TerminalContextProvider>
    </div>
  );
}

export default App;
