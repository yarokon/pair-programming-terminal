import { useEffect, useState } from 'react';
import * as Y from 'yjs';

import { files } from './collaboration';

export function useFiles() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

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

  const createFile = () => {
    const name = `file-${files.size + 1}.ts`;

    const ytext = new Y.Text();
    ytext.insert(0, `// ${name}\n`);

    files.set(name, ytext);
    setSelectedFile(name);
  };

  const clearFiles = () => {
    files.clear();
    setSelectedFile(null);
  };

  return { fileNames, selectedFile, setSelectedFile, createFile, clearFiles };
}
