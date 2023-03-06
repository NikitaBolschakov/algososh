import { IRandomArray } from "../../types/random-array";

export const MINLEN: number = 3;
export const MAXLEN: number = 17;
export const MINNUM: number = 0;
export const MAXNUM: number = 100;
export const initial: string = "default";
export const array: string = "array";
export const desc: string = "Direction.Descending";
export const asc: string = "Direction.Ascending";

//функция замены
export const swap = ( arr: IRandomArray[], first: number, second: number ) => {
  [arr[first], arr[second]] = [arr[second], arr[first]];
};

//Эта функция всегда возвращает случайное число между min и max (оба включены)
export function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}