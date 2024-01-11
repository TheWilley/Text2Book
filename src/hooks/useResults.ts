import {FormEvent, useState} from 'react';
import {toast} from 'react-toastify';

export default function useResults() {
    const [blink, setBlink] = useState(0);
    const blinkProps = {blink: blink};

    const copyAndNotify = (event: FormEvent, result: string) => {
        // FIXME: NEVER do this, its better to find out how to fix it. I am unsure as of now, so this will be laft as is for the time being
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        toast('Copied!', {className: 'font-bold text-green-600'});

        // Make parent linkable
        const target = (event.target as HTMLElement).closest('.listitem');
        target && target.classList.remove('noblink');

        // Blink to notify user which one was copied
        setBlink(1);

        // Copy the text inside the text field
        void navigator.clipboard.writeText(result);
    };

    const onAnimationEnd = (event: FormEvent) => {
        setBlink(0);
        // Make parent nonblinkable
        const target = (event.target as HTMLElement).closest('.listitem');
        target && target.classList.add('noblink');
    };

    return {blinkProps, onAnimationEnd, copyAndNotify};
}