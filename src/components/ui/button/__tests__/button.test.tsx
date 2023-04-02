import { fireEvent, render, screen } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'
import { Button } from '../button'

describe('Тестирование компонента Button', () => {
    it('Кнопка c текстом рендерится без ошибок', () => {
        const button = TestRenderer.create(<Button text='Text' />).toJSON()
        
        expect(button).toMatchSnapshot()
    })

    it('Кнопка без текста рендерится без ошибок', () => {
		const button = TestRenderer.create(<Button />).toJSON()

		expect(button).toMatchSnapshot()
	})

    it('Кнопка заблокирована, рендерится без ошибок', () => {
		const button = TestRenderer.create(<Button disabled />).toJSON()

		expect(button).toMatchSnapshot()
	})

    it('Кнопка c индикацией загрузки рендерится без ошибок', () => {
		const button = TestRenderer.create(<Button isLoader={true} />).toJSON()

		expect(button).toMatchSnapshot()
	})

    it('Нажатие на кнопку вызывает колбек', () => {
		window.alert = jest.fn();
		render(<Button text='Вызов колбека' onClick={() => { alert('Успешный вызов колбека') }} />)
		const button = screen.getByText("Вызов колбека");
		fireEvent.click(button);

		expect(window.alert).toHaveBeenCalledWith('Успешный вызов колбека');
	});
})