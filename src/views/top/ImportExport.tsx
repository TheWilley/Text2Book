import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import useImportExport from '../../hooks/useImportExport';

function ImportExport() {
  const [exportData, importData] = useImportExport();

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-2'>
        <Button
          id='export'
          label={
            <>
              <FontAwesomeIcon icon={faUpload} /> Export
            </>
          }
          onclick={exportData}
        />
        <Button
          id='import'
          label={
            <>
              <FontAwesomeIcon icon={faDownload} /> Import
            </>
          }
          onclick={importData}
        />
      </div>
      <hr className='p-3 mt-4' />
    </>
  );
}

export default ImportExport;
