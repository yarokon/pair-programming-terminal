import { ReactTerminal } from 'react-terminal';

export function Terminal() {
  // Define commands here
  const commands = {
    cd: (directory: string) => `changed path to ${directory}`,
  };

  return (
    <div style={{ height: '30vh' }}>
      <ReactTerminal commands={commands} />
    </div>
  );
}
