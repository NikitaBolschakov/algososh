export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => number;
  getSize: () => number;
  addStack: () => T[];
}
