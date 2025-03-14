import createBookGenerator from './MinecraftBook';
import { IBookParameters } from '../global/types';

self.onmessage = (e: MessageEvent<IBookParameters>) => {
  const book = createBookGenerator(e.data);
  self.postMessage(book);
};
