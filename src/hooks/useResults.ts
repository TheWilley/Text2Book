import {FormEvent, useEffect, useState} from 'react';
import {toast} from 'react-toastify';

export default function useResults(results: string[]) {
    const [blink, setBlink] = useState(0);
    const [copiedRows, setCopiedRows] = useState<number[]>([]);
    const blinkProps = {blink: blink};

    useEffect(() => {
        clearCheckedRows();
    }, [results]);

    const copyAndNotify = (event: FormEvent, index: number, result: string) => {
        // FIXME: NEVER do this, its better to find out how to fix it. I am unsure as of now, so this will be laft as is for the time being
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        toast('Copied!', {className: 'font-bold text-green-600'});

        // Make parent linkable
        const target = (event.target as HTMLElement).closest('.listitem');
        target && target.classList.remove('noblink');

        // Add to list of copied rows
        addCopiedRow(index);

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

    const addCopiedRow = (row: number) => setCopiedRows([...copiedRows, row]);

    const removeCopiedRow = (row: number) => setCopiedRows(prevRows => prevRows.filter(r => r !== row));

    const checkRowIsCopied = (row: number) => copiedRows.includes(row);

    const clearCheckedRows = () => setCopiedRows([]);

    return {
        blinkProps,
        onAnimationEnd,
        copyAndNotify,
        addCopiedRow,
        removeCopiedRow,
        checkRowIsCopied,
        clearCheckedRows
    };
}