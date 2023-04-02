import { ElementStates } from "../../types/element-states";

//Максимум — 11 символов
export const MAXLEN: number = 11;

//функция замены крайних индексов
export const flipIndex = (arr: string[], firstIndex: number, secondIndex: number)=> {
    [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};

//функция покраски кружков
export const paintingCircle = (index: number, nextIndex: number, arr: Array<string>) => {
    let arrSize = arr.length - 1;
    if (index < nextIndex || index > arrSize - nextIndex) {
      return ElementStates.Modified
    } else if (index === nextIndex || index === arrSize - nextIndex) {
      return ElementStates.Changing
    } else {
      return ElementStates.Default
    }
  }

 /*  const reversString = async (string: string): Promise<string[]> => {
    const arrayOfLetters = string.split('');
    let end = arrayOfLetters.length;

    setCurrentIndex(0);
    setIsLoader(true);
    setReversArray([...arrayOfLetters]);
    await delay(DELAY_IN_MS);

    for (let i = 0; i < Math.floor(end / 2); i++) {
      swap(arrayOfLetters, i, end - 1);
      setCurrentIndex(i => i + 1);
      setReversArray([...arrayOfLetters]);
      await delay(DELAY_IN_MS);
    }

    setCurrentIndex(i => i + 1);
    setIsLoader(false);

    return arrayOfLetters;
  } */

  /* export function reversString (string: string) {
    const arrayOfLetters = string.split('');
    let end = arrayOfLetters.length;
  
    for (let i = 0; i < Math.floor(end / 2); i++) {
      flipIndex(arrayOfLetters, i, end - 1);
    }
  
    return arrayOfLetters;
  } */

  //алгоритм разворота строки для тестов
  export const reverseString = (string: string) => {
    const array = string.split('');          //разбить массив
    
    let left = 0;                            //левый указатель на первый эл-т
    let right = array.length - 1;            //правый на последний эл-т
    while (left <= right) {
      flipIndex(array, left, right);                             //поменять местами значения
      left++;                                                    //левый указатель увеличить
      right--;                                                   //правый уменьшить
    }

    return array;
  }