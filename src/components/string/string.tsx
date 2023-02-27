import { FC, FormEvent, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './string.module.css'

export const StringComponent: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');             //стейт инпута
  const [isLoader, setIsLoader] = useState<boolean>(false);             //стейт лоадера
  const [nextIndex, setNextIndex] = useState<number>(0);                //кандидат на сортировку
  const [reverseArray, setReverseArray] = useState<Array<string>>([]);  //стейт массива из букв

  const onChange = (e: FormEvent<HTMLInputElement>) => {          //изменения в стейте инпута
    const string = e.currentTarget.value;
    setInputValue(string);
  }

  const reverseString = async (string: string) => {
    const array = string.split('');          //разбить массив
    setReverseArray([...array]);             //сохранить массив в стейт
    setNextIndex(0);                         //текущий индекс на 0
    setIsLoader(true);                       //лоадер на кнопку
    await delay(DELAY_IN_MS);                //установить задержку

    let left = 0;                            //левый указатель на первый эл-т
    let right = array.length - 1;            //правый на последний эл-т
    while (left <= right) {
      [array[left], array[right]] = [array[right], array[left]]; //поменять местами значения
      left++;                                                    //левый указатель увеличить
      right--;                                                   //правый уменьшить
      setNextIndex(left => left + 1);                            //кандидат на сортировку
      setReverseArray([...array]);                               //актуальный массив в стейт
      await delay(DELAY_IN_MS);                                  //задержка после замены
    }

    setIsLoader(false);
    return array;
  }

  const onClick = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reverseString(inputValue); //запустить функцию алгоритма
    setInputValue('');         //очистить инпут
  }

  const paintingCircle = (index: number, nextIndex: number, arr: Array<string>) => {
    let arrSize = arr.length - 1;
    if (index < nextIndex || index > arrSize - nextIndex) {
      return ElementStates.Modified
    } else if (index === nextIndex || index === arrSize - nextIndex) {
      return ElementStates.Changing
    } else {
      return ElementStates.Default
    }
  }

  return (
    <SolutionLayout title="Строка">
      <form className={style.form} onSubmit={onClick}>
        <Input
          onChange={onChange}
          isLimitText={true}
          maxLength={11}
          value={inputValue}
          extraClass="mr-6" />
        <Button
          text="Развернуть"
          isLoader={isLoader}
          onClick={onClick}
          disabled={!inputValue}
        />
      </form>
      <ul className={style.list}>
        {reverseArray.map((letter: string, index: number) => {
          return (
            <Circle
              key={index}
              letter={letter}
              state={paintingCircle(index, nextIndex, reverseArray)}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};