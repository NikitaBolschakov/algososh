import { ElementStates } from "../../types/element-states";
import { IListArr } from "./types";

export const initialArray = ['0', '34', '8', '1'];

export const listArr: IListArr[] = initialArray.map((item) => ({
    value: item,
    state: ElementStates.Default,
    shiftElement: null
}))

export const MAXINDEX: number = 9;
export const MAXLEN: number = 1;