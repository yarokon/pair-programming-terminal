import { ReactTerminal } from 'react-terminal';

export function Terminal() {
  // Define commands here
  const commands = {
    cd: (directory: string) => `changed path to ${directory}`,
  };

  return <ReactTerminal height="30vh" commands={commands} />;
}
