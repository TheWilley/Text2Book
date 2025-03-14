import { FormEvent, useCallback, useEffect, useState } from 'react';
import { IBookOutput } from '../global/types';

export default function useResults(results: IBookOutput) {
  const [page, setPage] = useState(1);
  const [truncatedResults, setTruncatedResults] = useState<
    { value: string; index: number }[]
  >([]);
  const [blink, setBlink] = useState(0);
  const [copiedRows, setCopiedRows] = useState<number[]>([]);
  const blinkProps = { blink: blink };

  /**
   * Clear checked rows when results change.
   */
  useEffect(() => {
    clearCheckedRows();
    setPage(1);
  }, [results]);

  /**
   * Update the truncated results when the page changes.
   */
  useEffect(() => {
    setTruncatedResults(
      results.book
        .slice(page * 10 - 10, page * 10)
        .map((value, index) => ({ value, index: page * 10 - 10 + index }))
    );
  }, [results, page]);

  /**
   * Go to the previous page.
   */
  const prevPage = () => setPage((prevPage) => (prevPage - 1 > 0 ? prevPage - 1 : 1));

  /**
   * Go to the next page.
   */
  const nextPage = () =>
    setPage((prevPage) =>
      prevPage + 1 > results.book.length / 10
        ? Math.ceil(results.book.length / 10)
        : prevPage + 1
    );

  /**
   * Copy the text inside the text field and notify the user.
   * @param event The event object.
   * @param index The index of the result.
   * @param result The result to copy.
   */
  const copyAndNotify = (event: FormEvent, index: number, result: string) => {
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

  /**
   * Handle the end of the animation.
   * @param event The event object.
   */
  const onAnimationEnd = (event: FormEvent) => {
    setBlink(0);
    // Make parent nonblinkable
    const target = (event.target as HTMLElement).closest('.listitem');
    target && target.classList.add('noblink');
  };

  /**
   * Add a row to the list of copied rows.
   * @param row The row to add.
   */
  const addCopiedRow = (row: number) => setCopiedRows([...copiedRows, row]);

  /**
   * Remove a row from the list of copied rows.
   * @param row The row to remove.
   */
  const removeCopiedRow = (row: number) =>
    setCopiedRows((prevRows) => prevRows.filter((r) => r !== row));

  /**
   * Check if a row is copied.
   * @param row The row to check.
   */
  const checkRowIsCopied = (row: number) => copiedRows.includes(row);

  /**
   * Clear the list of checked rows.
   */
  const clearCheckedRows = () => setCopiedRows([]);

  /**
   * Download the commands as a text file.
   */
  const download = useCallback(() => {
    const file = new Blob(
      [
        results.book.reduce(
          (acc, curr, index) =>
            acc +
            `-----=========== ITEM ${index} ===========-----` +
            '\n' +
            curr +
            '\n\n',
          ''
        ),
      ],
      {
        type: 'text/plain',
      }
    );
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated.txt';
    a.click();
    URL.revokeObjectURL(url);
  }, [results]);

  return {
    blinkProps,
    truncatedResults,
    page,
    download,
    onAnimationEnd,
    copyAndNotify,
    addCopiedRow,
    removeCopiedRow,
    checkRowIsCopied,
    clearCheckedRows,
    prevPage,
    nextPage,
  };
}
