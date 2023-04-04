import { reverseString } from '../utils';

describe('Тестирование компонента StringComponent', () => {

	it('Корректно разворачивает строку с чётным количеством символов', () => {
		expect(reverseString('1234')).toEqual(['4', '3', '2', '1']);
	});

	it('Корректно разворачивает строку с нечётным количеством символов', () => {
		expect(reverseString('12345')).toEqual(['5', '4', '3', '2', '1']);
	});

	it('Корректно разворачивает строку с одним символом', () => {
		expect(reverseString('1')).toEqual(['1']);
	});

	it('Корректно разворачивает пустую строку', () => {
		expect(reverseString('')).toEqual([]);
	})
})