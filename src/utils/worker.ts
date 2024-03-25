import BookGenerator, { BookParameters } from './MinecraftBook';

self.onmessage = (e: MessageEvent<BookParameters>) => {
    const book = new BookGenerator(e.data).book;
    self.postMessage(book);
};