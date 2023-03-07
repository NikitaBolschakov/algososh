import { FC, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";
import style from "./stack-page.module.css";
import { ILoader } from "../../types/loader";
import { Stack } from "../../classes/stack";
import { MAXLEN, MAXSIZE } from "./utils";

const stack = new Stack<string>();

export const StackPage: FC = () => {

  const [inputValue, setInputValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stackArray, setStackArray] = useState<string[]>([]);
  const [isLoader, setIsLoader] = useState<ILoader>({
    add: false,
    remove: false,
    clear: false,
    disabled: false,
  });

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const string = e.currentTarget.value;
    setInputValue(string);
  }

  const push = async (item: string ) => {
    setIsLoader({
      ...isLoader,
      add: true,
      disabled: true
    });
    stack.push(item);
    setStackArray(stack.addStack());
    setInputValue('');
    await delay(SHORT_DELAY_IN_MS);
    setCurrentIndex(currentIndex + 1);
    setIsLoader({
      ...isLoader,
      add: false,
      disabled: false
    });
  }

  const pop = async () => {
    setIsLoader({
      ...isLoader,
      remove: true,
      disabled: true
    });
    setCurrentIndex(stack.getSize() - 1);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArray([...stack.addStack()]);
    setIsLoader({
      ...isLoader,
      remove: false,
      disabled: false
    });
  }

  const peak = () => {
    return stack.peak();
  }

  const clear = () => {
    setIsLoader({
      ...isLoader,
      clear: true,
      disabled: true
    });
    stack.clear();
    setStackArray(stack.addStack());
    setCurrentIndex(0);
    setIsLoader({
      ...isLoader,
      clear: false,
      disabled: false
    });
  }

  return (
    <SolutionLayout title="Стек">
      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <div className={style.inputs}>
          <Input
            onChange={onChange}
            maxLength={MAXLEN}
            isLimitText={true}
            value={inputValue}
            extraClass="mr-6"
            disabled={isLoader.disabled || stackArray.length > MAXSIZE}
          />
          <Button
            text="Добавить"
            isLoader={isLoader.add}
            onClick={() => push(inputValue)}
            disabled={!inputValue || stackArray.length > MAXSIZE || isLoader.disabled }
            extraClass="mr-6"
          />
          <Button
            text="Удалить"
            isLoader={isLoader.remove}
            onClick={pop}
            disabled={stackArray.length < 1 || isLoader.disabled}
          />
        </div>
        <Button
          text="Очистить"
          isLoader={isLoader.clear}
          onClick={clear}
          disabled={stackArray.length < 1 || isLoader.disabled}
        />
      </form>
      <ul className={style.list}>
        {stackArray.map((item, index: number) => {
          return (
            <Circle
              key={index}
              letter={item}
              index={index}
              head={peak() === index ? "top" : ''}
              state={index === currentIndex ? ElementStates.Changing : ElementStates.Default}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
