import { FC, FormEvent, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './string.module.css'
import { flipIndex, MAXLEN, paintingCircle } from "./utils";

export const StringComponent: FC = () => {
  const [inputValue, setInputValue] = useState('');             //стейт инпута
  const [isLoader, setIsLoader] = useState(false);              //стейт лоадера
  const [nextIndex, setNextIndex] = useState(0);                //кандидат на сортировку
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
      flipIndex(array, left, right);                             //поменять местами значения
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

  return (
    <SolutionLayout title="Строка">
      <form className={style.form} onSubmit={onClick} data-cy="form">
        <Input
          onChange={onChange}
          isLimitText={true}
          maxLength={MAXLEN}
          value={inputValue}
          extraClass="mr-6"
          data-cy="input" />
        <Button
          text="Развернуть"
          isLoader={isLoader}
          onClick={onClick}
          disabled={!inputValue}
          data-cy="button"
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