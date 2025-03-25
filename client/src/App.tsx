import { Editor } from './components/Editor';
import { TerminalContextProvider } from 'react-terminal';
import { Terminal } from './components/Terminal';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <TerminalContextProvider>
        <Editor />
        <Terminal />
      </TerminalContextProvider>
    </div>
  );
}

export default App;
