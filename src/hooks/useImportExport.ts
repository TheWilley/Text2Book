import { SETTINGS_LOCALSTORAGE_KEY } from '../global/constants';
import { Settings } from '../global/types';

export default function useImportExport(settings: Settings) {
  // A unique ID used in exported data to verify it during import
  const uniqueId = 'text2book';

  const exportData = () => {
    // We adjust settingsChanged to false as settings would not be changed at import
    const updatedSettings = { ...settings, settingsAdjusted: false };
    const dataToExport = { id: uniqueId, ...updatedSettings };

    // Stringify the settings and create a blob for download
    const settingsString = JSON.stringify(dataToExport);

    // Create a temporary link to trigger the download
    const blob = new Blob([settingsString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text2book-export.json';

    // Trigger the download
    a.click();

    // We don't need the URL anymore, so we revoke it
    URL.revokeObjectURL(url);
  };

  const importData = () => {
    // Create a hidden file input to select the JSON file
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    // When a file is selected, we read it and update localStorage with the new settings
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const data = JSON.parse(result) as Settings & { id: string };
          if (data.id !== 'text2book') {
            alert('JSON file is not a valid text2book export.');
            return;
          }
          localStorage.setItem(SETTINGS_LOCALSTORAGE_KEY, JSON.stringify(data));
          window.location.reload();
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return [exportData, importData] as const;
}
