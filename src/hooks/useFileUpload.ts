import { ChangeEvent, useState } from 'react';

export default function useFileUpload(callback: (readerResult: string) => void) {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);

    // If file type is text/plain
    if (file?.type === 'text/plain') {
      // Read the file
      const reader = new FileReader();
      reader.readAsText(file);

      // Set the file name
      setFileName(file.name);

      // Set the text
      reader.onload = () => {
        callback(reader.result as string);
      };
    }
  };

  return { fileName, handleFileChange };
}
