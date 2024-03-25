import MinecraftBook, { BookParameters } from './MinecraftBook';

self.onmessage = (e: MessageEvent<BookParameters>) => {
    const book = new MinecraftBook(e.data).generate();
    self.postMessage(book);
};