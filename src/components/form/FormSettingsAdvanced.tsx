import { useState } from 'react';

function FormSettingsAdvanced() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className='grid w-full grid-cols-1 gap-2 rounded-xl bg-gray-200 p-2 mt-2'>
        <input
          type='radio'
          name='advanced-settings'
          id='advanced-settings'
          className='peer hidden'
          onClick={() => setOpen(!open)}
        />
        <label
          htmlFor='advanced-settings'
          className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white hover:bg-blue-200 transition'
        >
          Advanced
        </label>
        {open && (
          <div className='grid grid-cols-2'>
            <div className='border bg-gray-300 rounded-xl'>
              <div>
                <input
                  type='checkbox'
                  name='name-numbering'
                  id='name-numbering'
                  className='peer hidden'
                />
                <label
                  htmlFor='name-numbering'
                  className='block cursor-pointer select-none rounded-xl p-2 text-center bg-red-500 peer-checked:bg-green-500 peer-checked:font-bold text-white peer-checked:hover:bg-green-600 hover:bg-red-600 transition mb-3'
                >
                  Append number after book names
                </label>
              </div>
              <div>
                <label
                  htmlFor='format'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Format
                </label>
                <input
                  type='text'
                  id='format'
                  placeholder='[n]'
                  className='text-center w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300'
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FormSettingsAdvanced;
