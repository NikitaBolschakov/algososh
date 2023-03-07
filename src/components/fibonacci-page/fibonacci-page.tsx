import { FC, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import style from './fibonacci-page.module.css'
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { getNumber, MAXLEN, MAXVALUE } from "./utils";

export const FibonacciPage: FC = () => {
  const [inputValue, setInputValue] = useState<number | string>('');;       //стейт инпута
  const [isLoader, setIsLoader] = useState(false);                          //стейт лоадера
  const [fibArray, setFibArray] = useState<Array<number>>([]);              //массив фибоначи

  const onChange = (e: FormEvent<HTMLInputElement>): void => {              //изменения в стейте инпута
    const string = e.currentTarget.value;
    setInputValue(string);
  }

  const getArray = async () => {
    setIsLoader(true);
    const fibArray = [];
    for(let i = 1; i <= Number(inputValue) + 1; i++) {
      await delay(SHORT_DELAY_IN_MS);
      fibArray.push(getNumber(i));
      setFibArray([...fibArray]);
    }
    setIsLoader(false);
  }

  const onClick = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    getArray();               //запустить функцию алгоритма
    setInputValue('');        //очистить инпут
  }

  const maxNumber = inputValue <= 0 || inputValue > MAXVALUE;

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={style.form} onSubmit={onClick}>
        <Input
          type="number"
          onChange={onChange}
          isLimitText={true}
          maxLength={MAXLEN}
          max={MAXVALUE}
          value={inputValue}
          extraClass="mr-6" />
        <Button
          text="Рассчитать"
          isLoader={isLoader}
          onClick={onClick}
          disabled={maxNumber}
        />
      </form>
      <ul className={style.list}>
      {fibArray.map((number: number, index: number) => {
          return  (
              <Circle
                  key={index}
                  letter={`${number}`}
                  index={index}
              />)
        })}
      </ul>
    </SolutionLayout>
  );
};