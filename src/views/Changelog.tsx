import changelog from '../data/changelog.json';
import Accordion from '../components/Accordion';

function Changelog() {
  return (
    <div className='mb-2'>
      <Accordion label='📜 Changelog' id='changelog'>
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
            </tr>
          </thead>
          <tbody className='text-left border'>
            {changelog.map((log, logIndex) => (
              <tr key={logIndex}>
                <td className='p-2 align-top border'>
                  <h3 className='mb-2'>{log.date}</h3>
                </td>
                <td className='p-2 align-top border'>
                  <ul className='list-disc list-inside'>
                    {log.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </td>
                <td className='p-2 align-top border'>
                  <ul className='list-disc list-inside'>
                    {log.fixes.map((fix, fixIndex) => (
                      <li key={fixIndex}>{fix}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Accordion>
    </div>
  );
}

export default Changelog;
