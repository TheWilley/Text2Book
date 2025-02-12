export default function useImportExport() {
  const exportData = () => {
    const localStorageString = JSON.stringify({
      ...{ id: 'text2book' },
      ...localStorage,
    });
    const blob = new Blob([localStorageString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text2book-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const data = JSON.parse(result) as Record<string, string>;
          if (data.id !== 'text2book') {
            alert('JSON file is not a valid text2book export.');
            return;
          }
          Object.keys(data).forEach((key) => {
            localStorage.setItem(key, data[key]);
          });
          window.location.reload();
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return [exportData, importData] as const;
}
