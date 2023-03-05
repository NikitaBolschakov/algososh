import { IStack } from "../components/stack-page/types";

export class Stack<T> implements IStack<T> {
    private array: T[] = [];
    push = (item: T): void => {
        this.array.push(item)
    };
    pop = (): void => {
        this.array.pop()
    };
    clear = () => {
        this.array = [];
    }
    peak = (): number => {
        return this.getSize() - 1;
    };
    getSize = (): number => {
        return this.array.length;
    }
    addStack = (): T[] => {
        return this.array;
    }
  }