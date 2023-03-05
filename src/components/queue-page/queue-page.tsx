import { FC, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import style from "./queue-page.module.css";
import { ILoader } from "../../types/loader";
import { Queue } from "../../classes/queue";

export const QueuePage: FC = () => {

  const [queue] = useState(new Queue<string>(7)); 
  const [inputValue, setInputValue] = useState<string>('');    
  const [currentIndex, setCurrentIndex] = useState<number>(-1); 
  const [queueArray, setQueueArray] = useState<(string | undefined)[]>(queue.printQueue()); 
  const [head, setHead] = useState<number>(queue.getHead()); 
  const [tail, setTail] = useState<number>(queue.getTail()); 
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

  const enqueue = async (item: string) => { 
    setIsLoader({
      ...isLoader,
      add: true,
      disabled: true
    });

    queue.enqueue(item);
    setInputValue('')
    setQueueArray([...queue.printQueue()]);
    setTail(queue.getTail());
    setCurrentIndex(tail % queue.getSize());
    await delay(500);
    setCurrentIndex(-1);
    await delay(500);

    setIsLoader({
      ...isLoader,
      add: false,
      disabled: false
    });
  }

  const dequeue = async () => { 
    setIsLoader({
      ...isLoader,
      remove: true,
      disabled: true
    });

    if (queue) {
      queue.dequeue();
      setQueueArray([...queue.printQueue()]);
      setCurrentIndex((head & queue.getSize()));
      await delay(500);
      setHead(queue.getHead());

      setCurrentIndex(-1);
      await delay(500);

      setIsLoader({
        ...isLoader,
        remove: false,
        disabled: false
      });
    }
  }

  const clear = () => {
    setIsLoader({
      ...isLoader,
      clear: true,
      disabled: true
    });

    queue.clear();
    setQueueArray(queue.printQueue());
    setHead(queue.getHead());
    setTail(queue.getTail());

    setIsLoader({
      ...isLoader,
      clear: false,
      disabled: false
    });
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <div className={style.inputs}>
          <Input
            disabled={isLoader.disabled}
            onChange={onChange}
            maxLength={4}
            isLimitText={true}
            value={inputValue}
            extraClass="mr-6"
          />
          <Button
            text="Добавить"
            disabled={!inputValue || tail === 7 || isLoader.disabled}
            isLoader={isLoader.add}
            onClick={() => enqueue(inputValue)}
            extraClass="mr-6"
          />
          <Button
            text="Удалить"
            onClick={() => dequeue()}
            isLoader={isLoader.remove}
            disabled={queue.isEmpty() || isLoader.disabled}
          />
        </div>
        <Button
          text="Очистить"
          onClick={() => clear()}
          isLoader={isLoader.clear}
          disabled={head === 0 && tail === 0 || isLoader.disabled}
        />
      </form>
      <ul className={style.list}>
        {queueArray.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item}
              index={index}
              head={(index === head && !queue.isEmpty()) ? "head" : ""}
              tail={(index === tail - 1 && !queue.isEmpty()) ? "tail" : ""}
              state={index === currentIndex ? ElementStates.Changing : ElementStates.Default}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};