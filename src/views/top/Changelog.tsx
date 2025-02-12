import changelog from '../../data/changelog.json';
import Accordion from '../../components/Accordion';
import { IChangelog } from '../../global/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll } from '@fortawesome/free-solid-svg-icons';

function Commit({ commit }: { commit: { hashes: string[]; message: string } }) {
  return (
    <li className='bg-gray-100 p-2 rounded-lg group mb-2'>
      <div>{commit.message}</div>
      <div className='max-h-0 group-hover:max-h-96 overflow-hidden transition-all duration-300'>
        <hr className='my-2' />
        {commit.hashes.map((hash, hashIndex) => (
          <a
            key={hashIndex}
            href={`https://github.com/TheWilley/Text2Book/commit/${hash}`}
            className='block text-blue-500 hover:underline'
            target='_blank'
          >
            {hash.slice(0, 7)}
          </a>
        ))}
      </div>
    </li>
  );
}

function Changelog() {
  return (
    <div className='mb-2 w-full overflow-x-auto'>
      <Accordion
        label={
          <>
            <FontAwesomeIcon icon={faScroll} /> Changelog
          </>
        }
        id='changelog'
      >
        <table className='w-full border-collapse bg-white rounded-xl border-blue-200'>
          <thead>
            <tr>
              <th className='text-left p-2 border'>
                <span className='bg-purple-700 rounded-lg text-white p-1'>Date</span>
              </th>
              <th className='text-left p-2 border'>
                <span className='bg-green-700 rounded-lg text-white p-1'>Features</span>
              </th>
              <th className='text-left p-2 border'>
                <span className='bg-black rounded-lg text-white p-1'>Fixes</span>
              </th>
              <th className='text-left p-2 border'>
                <span className='bg-yellow-700 rounded-lg text-white p-1'>Changes</span>
              </th>
              <th className='text-left p-2 border'>
                <span className='bg-blue-700 rounded-lg text-white p-1'>Notes</span>
              </th>
            </tr>
          </thead>
          <tbody className='text-left border'>
            {(changelog as IChangelog[]).map((log, logIndex) => (
              <tr key={logIndex}>
                <td className='p-2 align-top border'>
                  <h3 className='mb-2 font-semibold'>{log.date}</h3>
                </td>
                <td className='p-2 align-top border'>
                  <ul>
                    {log.features?.map((feature, featureIndex) => (
                      <Commit key={featureIndex} commit={feature} />
                    ))}
                  </ul>
                </td>
                <td className='p-2 align-top border'>
                  <ul>
                    {log.fixes?.map((fix, fixIndex) => (
                      <Commit key={fixIndex} commit={fix} />
                    ))}
                  </ul>
                </td>
                <td className='p-2 align-top border'>
                  <ul>
                    {log.changes?.map((note, noteIndex) => (
                      <Commit key={noteIndex} commit={note} />
                    ))}
                  </ul>
                </td>
                <td className='p-2 align-top border'>
                  <ul>
                    {log.notes?.map((note, noteIndex) => (
                      <li
                        key={noteIndex}
                        className='bg-gray-100 p-2 rounded-lg group mb-2'
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Accordion>
      <hr className='my-4' />
    </div>
  );
}

export default Changelog;
