import changelog from '../data/changelog.json';
import Accordion from '../components/Accordion';

function Changelog() {
  return (
    <div className='mb-2'>
      <Accordion label='📜 Changelog' id='changelog'>
        <ul>
          <li className='text-left w-full space-y-5'>
            {changelog.map((log, index) => (
              <div key={index}>
                <h3 className='font-bold underline mb-2'>{log.date}</h3>
                <ul className='space-y-3'>
                  {log.features.map((feature, index) => (
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
                  {log.fixes.map((fix, index) => (
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
      </Accordion>
      <hr className='my-4' />
    </div>
  );
}

export default Changelog;
