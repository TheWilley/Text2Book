import createBookGenerator from './MinecraftBook';
import { BookParameters } from './MinecraftBook';

self.onmessage = (e: MessageEvent<BookParameters>) => {
  const book = createBookGenerator(e.data);
  self.postMessage(book);
};
