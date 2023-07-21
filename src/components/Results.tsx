import { toast } from 'react-toastify';
import copy from '../assets/copy-icon.png';
import { useState } from 'react';
import styles from '../css/blink.module.css';

function Results(props: { results: string[] }) {
    const [blink, setBlink] = useState(0);
    const allowedProps = { blink: blink };
    const copyAndNotify = (result: string, index:number) => {
        // FIXME: NEVER do this, its better to find out how to fix it. I am unsure as of now, so this will be laft as is for the time being
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        toast(`Command "${index + 1}" copied!`);

        // Blink to notify user which one was copied
        setBlink(1);

        // Copy the text inside the text field
        void navigator.clipboard.writeText(result);
    };

    return (
        props.results.map((result, index) =>
        (
            <li key={index} className={`flex rounded border overflow-hidden h-12 mb-1 ${styles.blink}`} {...allowedProps} onAnimationEnd={() => setBlink(0)}>
                <button onClick={() => copyAndNotify(result, index)} className='w-12 bg-gray-300 h-full p-2 border-right group'>
                    <img className='p-1 group-hover:opacity-70 transition' src={copy} />
                </button>
                <input className='w-full p-2 opacity-80 font-mono h-full outline-none' type='text' value={result} readOnly />
                <div className='text-xl p-2 bg-gray-300 select-none'>
                    {index + 1}
                </div>
            </li>
        ))
    );
}

export default Results;