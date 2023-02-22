import { FC, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import style from './fibonacci-page.module.css'
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: FC = () => {
  const [inputValue, setInputValue] = useState<number | string>('');;       //стейт инпута
  const [isLoader, setIsLoader] = useState<boolean>(false);                 //стейт лоадера
  const [fibArray, setFibArray] = useState<Array<number>>([]);              //массив фибоначи

  const onChange = (e: FormEvent<HTMLInputElement>): void => {              //изменения в стейте инпута
    const string = e.currentTarget.value;
    setInputValue(string);
  }

  const onClick = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    getFibArray();            //запустить функцию алгоритма
    setInputValue('');        //очистить инпут
  }

  const getFibNumber = (n: number) => {
    if(n < 2) return n;
    let a = 1;
    let b = 1;
    for(let i = 3; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
  };

  const getFibArray = async () => {
    setIsLoader(true);
    const fibArray = [];
    for(let i = 1; i <= Number(inputValue) + 1; i++) {
      await delay(SHORT_DELAY_IN_MS);
      fibArray.push(getFibNumber(i));
      setFibArray([...fibArray]);
    }
    setIsLoader(false);
  }

  const maxNumber = inputValue > 0 && inputValue <= 19 ? false : true;

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={style.form} onSubmit={onClick}>
        <Input
          type="number"
          onChange={onChange}
          isLimitText={true}
          maxLength={2}
          max={19}
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
      {fibArray.map((element: number, index: number) => {
          return  (
              <Circle
                  key={index}
                  letter={`${element}`}
                  index={index}
              />)
        })}
      </ul>
    </SolutionLayout>
  );
};
