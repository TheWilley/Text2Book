import generateBooks from './generateBooks';
import { IBookParameters } from '../global/types';

self.onmessage = (e: MessageEvent<IBookParameters>) => {
  const book = generateBooks(e.data);
  self.postMessage(book);
};
