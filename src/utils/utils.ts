import { IRandomArray } from './../components/sorting-page/utils';

//функция задержки
export const delay = (ms: number) => new Promise<void> (
    (resolve) => setTimeout(resolve, ms)
);

//функция замены
export const swap = (arr: IRandomArray[], first: number, second: number): void => {
    [arr[first], arr[second]] = [arr[second], arr[first]];
 /* const buff = arr[first];
    arr[first] = arr[second];
    arr[second] = buff; */
  };

  //Эта функция всегда возвращает случайное число между min и max (оба включены)
  export function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
 }
