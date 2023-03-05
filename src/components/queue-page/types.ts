//интерфейс для очереди
export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | undefined;
  getHead: () => number;
  getTail: () => number;
  clear: () => void;
  isEmpty: () => boolean;
  getSize: () => number;
  printQueue: () => Array<T | undefined>;
}