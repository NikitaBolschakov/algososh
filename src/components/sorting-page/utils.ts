import { ElementStates } from "../../types/element-states";

export const initial: string = 'default';
export const array: string = 'array';
export const desc: string = 'Direction.Descending';
export const asc: string = 'Direction.Ascending';

export interface IRandomArray {
	num: number,
	state: ElementStates
}