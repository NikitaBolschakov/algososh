import { ElementStates } from "../../types/element-states";

export interface ILinkedList<T> {
    prepend: (element: T) => void;
    append: (element: T) => void;
    addByIndex: (element: T, position: number) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    deleteByIndex: (position: number) => void;
    toArray: () => void;
  }

  export interface IShiftElement {
    value: string;
    state: ElementStates;
    position: 'addAction' | 'removeAction';
  }
  
  export interface IListArr {
    value: string,
    state: ElementStates
    shiftElement: IShiftElement | null;
  }
  
  export interface IStateLoader {
    insertInBegin: boolean,
    insertAtEnd: boolean,
    appendByIndex: boolean,
    removeHead: boolean,
    removeTail: boolean,
    removeFrom: boolean
  }