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
export const swap = (arr: IRandomArray[], first: number, second: number) => {
  [arr[first], arr[second]] = [arr[second], arr[first]];
};

//Эта функция всегда возвращает случайное число между min и max (оба включены)
export function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//алгоритм сортировки выбором для тестирования
/* export const selectionSort = (array: IRandomArray[]) => {
	const { length } = array;
	for (let i = 0; i < length; i++) {
		let maxInd = i;
		for (let j = i + 1; j < length; j++) {
			
      if (array[maxInd].num < array[j].num) {
				maxInd = j;
			}
		}
		if (maxInd !== i) {
			swap(array, i, maxInd);
		}
	}
	return array;
}; */

//алгоритм сортировки выбором для тестирования
export const selectionSort = (array: IRandomArray[]) => {
  for (let n = 0; n < array.length; n++) {
    let max = n;
    for (let i = n + 1; i < array.length; i++) {
      if (array[max].num < array[i].num) {
        max = i;
      }
    }
    if (max !== n) {
      swap(array, n, max);
    }
  }

  return array;
};

/* export const bubbleSort = (array: IRandomArray[]) => {
	const { length } = array;

	for (let i = 0; i < length; i++) {
		for (let compareIndex = 0; compareIndex < length - i - 1; compareIndex++) {
			const left = array[compareIndex].num;
			const right = array[compareIndex + 1].num;

			if (left < right) {
				array[compareIndex].num = right;
				array[compareIndex + 1].num = left;
			}
		}
	}

	return array;
}  */

//алгоритм сортировки выбором для тестирования
export const bubbleSort = (array: IRandomArray[]) => {
  for (let n = 0; n < array.length; n++) {
    for (let i = 0; i < array.length - 1 - n; i++) {
      let beg = array[i].num;
      let end = array[i + 1].num;

      if (beg < end) {
        array[i].num = end;
        array[i + 1].num = beg;
      }
    }
  }

  return array;
};
