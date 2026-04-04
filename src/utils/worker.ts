import generateBooks from './generateBooks';
import { BookParameters } from '../global/types';

self.onmessage = (e: MessageEvent<BookParameters>) => {
  const book = generateBooks(e.data);
  self.postMessage(book);
};
