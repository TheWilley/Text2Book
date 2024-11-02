import { useState } from 'react';
import changelog from '../data/changelog.json';

function Changelog() {
  const [showChangelog, setShowChangelog] = useState(false);

  const toggleChangelog = () => setShowChangelog(!showChangelog);

  return (
    <div>
      <button onClick={toggleChangelog} className='mb-3 opacity-60 hover:opacity-100'>
        📜 Changelog
      </button>

      {showChangelog && (
        <>
          {/* Overlay */}
          <div
            className='fixed inset-0 bg-black bg-opacity-70 z-20'
            onClick={toggleChangelog}
          />

          {/* Modal */}
          <div className='fixed inset-0 flex items-center justify-center z-30'>
            <div className='w-screen h-screen md:h-auto md:w-96 bg-gray-100 md:rounded-lg p-5 overflow-y-auto relative'>
              <button
                onClick={toggleChangelog}
                className='absolute top-3 right-3 text-gray-500 hover:text-gray-800'
              >
                ✖
              </button>
              <h2 className='text-xl font-semibold mb-4'>Changelog</h2>
              <ul>
                <li className='text-left w-full space-y-5'>
                  {changelog.map((log, index) => (
                    <div className='bg-gray-300 rounded-lg p-3' key={index}>
                      <h3 className='font-bold underline mb-2'>{log.date}</h3>
                      <ul className='space-y-3'>
                        {(log.features as string[]).map((feature, index) => (
                          <li className='flex gap-2' key={index}>
                            <span>
                              <span className='bg-purple-400 rounded-full px-2 py-1 font-mono'>
                                New
                              </span>
                            </span>
                            <span> {feature}</span>
                          </li>
                        ))}
                      </ul>
                      <ul className='space-y-3 mt-3'>
                        {(log.fixes as string[]).map((fix, index) => (
                          <li className='flex gap-2' key={index}>
                            <span>
                              <span className='bg-blue-400 rounded-full px-2 py-1 font-mono'>
                                Fix
                              </span>
                            </span>
                            <span> {fix}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Changelog;
