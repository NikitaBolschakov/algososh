import { FC, useState, ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import style from "./sorting-page.module.css";
import { delay, getRndInteger, swap } from "../../utils/utils";
import { IRandomArray } from "../../types/random-array";
import { array, asc, desc, initial } from "../../constants/sorting";

export const SortingPage: FC = () => {

  const [isLoader, setIsLoader] = useState<string>(initial);
  const [radioButton, setRadioButton] = useState<string>("selection-sort");
  const [randomArray, setRandomArray] = useState<IRandomArray[]>([]);

  //cгенерировать массив при загрузке
  useEffect(() => {
    setRandomArray(randomArr(0, 100))
  }, []);

  //генерирует новый массив
  const randomArr = (min: number, max: number, minLen = 3, maxLen = 17): IRandomArray[] => {
    const randomNumbers: IRandomArray[] = [];
    const lengthArr = getRndInteger(minLen, maxLen);
    let i = 0;
    while (i < lengthArr) {
      randomNumbers.push({
        num: getRndInteger(min, max),
        state: ElementStates.Default
      });
      i++;
    }
    return randomNumbers;
  }

  //сортировка выбором
  const selectionSort = async (array: IRandomArray[], direction: boolean): Promise<IRandomArray[]> => {
    for (let n = 0; n < array.length; n++) {     //пройтись по массиву столько сколько эл-тов есть в нем
      let max = n;                               //максимальное число в массиве
      array[max].state = ElementStates.Changing;
      for (let i = n + 1; i < array.length; i++) {
        array[i].state = ElementStates.Changing;
        setRandomArray([...array]);
        await delay(SHORT_DELAY_IN_MS);
        if (direction ? array[i].num < array[max].num : array[i].num > array[max].num) {
          max = i;
          array[i].state = ElementStates.Changing;
          array[max].state = i === max ? ElementStates.Changing : ElementStates.Default;
        } else if (i !== max) {
          array[i].state = ElementStates.Default;
        }
        setRandomArray([...array]);
      }
      swap(array, max, n);
      array[max].state = ElementStates.Default;
      array[n].state = ElementStates.Modified;
      setRandomArray([...array]);
    }
    setIsLoader('default');
    return array;
  };

  //сортировка пузырьком
  const bubbleSort = async (array: IRandomArray[], direction: boolean): Promise<IRandomArray[]> => {
    for (let n = 0; n < array.length; n++) {
      for (let i = 0; i < array.length - 1 - n; i++) {
        let beg = array[i].num;
        let end = array[i + 1].num;
        array[i].state = ElementStates.Changing;
        array[i + 1].state = ElementStates.Changing;
        setRandomArray([...array]);
        await delay(SHORT_DELAY_IN_MS);
        if (direction ? beg > end : beg < end) {
          array[i].num = end;
          array[i + 1].num = beg;
        }
        array[i].state = ElementStates.Default;
        if (array[i + 1]) {
          array[i + 1].state = ElementStates.Default;
        }
        setRandomArray([...array]);
      }
      array[array.length - 1 - n].state = ElementStates.Modified;
      setRandomArray([...array])
    }
    setIsLoader('default');
    return array;
  }

  //клик по радио-кнопке
  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadioButton((e.target as HTMLInputElement).value);
  };

  //клик по кнопкам сорировки
  const onClickSort = async (direction: string): Promise<void> => {
    setIsLoader(direction);
    const compare = direction === 'Direction.Ascending';
    if (radioButton === 'selection-sort') {
      setRandomArray([...await selectionSort(randomArray, compare)]);
    } else {
      setRandomArray([...await bubbleSort(randomArray, compare)]);
    }
  }

  //клик по кнопке - новый массив
  const onClickNewArray = () => {
    setRandomArray(randomArr(0, 100));
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={style.form}>
        <div className={style.buttons}>
          <RadioInput
            disabled={isLoader === desc || isLoader === asc}
            label="Выбор"
            name={"sorting-type"}
            value={"selection-sort"}
            defaultChecked
            extraClass="mr-20"
            onChange={onChangeRadio}
          />
          <RadioInput
            disabled={isLoader === desc || isLoader === asc}
            label="Пузырек"
            name={"sorting-type"}
            value={"bubble-sort"}
            onChange={onChangeRadio}
          />
        </div>
        <div className={style.buttons}>
          <Button
            text="По возрастанию"
            onClick={() => onClickSort(asc)}
            isLoader={isLoader === asc}
            disabled={isLoader === desc}
            sorting={Direction.Ascending}
            extraClass="mr-6"
          />
          <Button
            text="По убыванию"
            onClick={() => onClickSort(desc)}
            isLoader={isLoader === desc}
            disabled={isLoader === asc}
            sorting={Direction.Descending}
            extraClass="mr-40"
          />
          <Button
            disabled={isLoader !== array && isLoader !== initial}
            text="Новый массив"
            onClick={onClickNewArray}
          />
        </div>
      </form>
      <ul className={style.list}>
        {randomArray.map((element: IRandomArray, index: number, state: IRandomArray[]) => {
          return (
            <Column
              key={index}
              index={element.num}
              state={element.state}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};