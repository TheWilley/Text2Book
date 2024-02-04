import { saveAs } from 'file-saver';
import { useEffect } from 'react';
export default function useDebug(data: string[]) {
  useEffect(() => {
    const blob = new Blob([new TextEncoder().encode(JSON.stringify(data))], {
      type: 'application/json;charset=utf-8',
    });
    if (data.length > 0) {
      saveAs(blob, 'text2book.json');
    }
  }, [JSON.stringify(data)]);
}
