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