import { ElementStates } from '../../../types/element-states';
import { bubbleSort, selectionSort } from '../utils';

const stub = [
	{num: 10, state: ElementStates.Default},
	{num: 19, state: ElementStates.Default},
	{num: 4, state: ElementStates.Default},
	{num: 5, state: ElementStates.Default},
	{num: 3, state: ElementStates.Default}
]

const result = [
	{num: 19, state: ElementStates.Default},
	{num: 10, state: ElementStates.Default},
	{num: 5, state: ElementStates.Default},
	{num: 4, state: ElementStates.Default},
	{num: 3, state: ElementStates.Default}
]

describe('Тестирование компонента SortingPage', () => {
	
    //сортировка выбором
	it('Сортировка пустого массива', () => {
		expect(selectionSort([])).toEqual([]);
	});

	it('Сортировка массива из одного элемента', () => {
		expect(selectionSort([{
			num: 3,
			state: ElementStates.Default
		}])).toStrictEqual([{
			num: 3,
			state: ElementStates.Default
		}]);
	});

	it('Сортировка массива из нескольких элементов', () => {
		expect(selectionSort(stub)).toStrictEqual(result);
	});

	//тест сортировка пузырьком
	it('Сортировка пустого массива', () => {
		expect(bubbleSort([])).toEqual([]);
	});

	it('Сортировка массива из одного элемента', () => {
		expect(bubbleSort([{
			num: 3,
			state: ElementStates.Default
		}])).toStrictEqual([{
			num: 3,
			state: ElementStates.Default
		}]);

	});
	it('Сортировка массива из нескольких элементов', () => {
		expect(bubbleSort(stub)).toStrictEqual(result);
	});
})