import TestRenderer from 'react-test-renderer';
import { Circle } from '../circle';
import { ElementStates } from '../../../../types/element-states';

describe('Тестирование компонента Circle', () => {
	it('Circle без буквы рендерится без ошибок', () => {
		const circle = TestRenderer.create(<Circle />).toJSON()

		expect(circle).toMatchSnapshot()
	})

	it('Circle с буквами рендерится без ошибок', () => {
		const circle = TestRenderer.create(<Circle letter='1' />).toJSON()

		expect(circle).toMatchSnapshot()
	})

	it('Circle с head рендерится без ошибок', () => {
		const circle = TestRenderer.create(<Circle head='1' />).toJSON()

		expect(circle).toMatchSnapshot()
	})

	it('Circle с react-элементом в head рендерится без ошибок', () => {
		const circle = TestRenderer.create(<Circle head={<Circle />} />).toJSON()

		expect(circle).toMatchSnapshot()
	})

	it('Circle с tail рендерится без ошибок', () => {
		const circle = TestRenderer.create(<Circle tail='1' />).toJSON()

		expect(circle).toMatchSnapshot()
	})

	it('Circle с react-элементом в tail рендерится без ошибок', () => {
		const circle = TestRenderer.create(<Circle tail={<Circle />} />).toJSON()

		expect(circle).toMatchSnapshot()
	})

	it('Circle с index рендерится без ошибок', () => {
		const circle = TestRenderer.create(<Circle index={0} />).toJSON()

		expect(circle).toMatchSnapshot()
	}) 

	it('Circle с пропом isSmall ===  true рендерится без ошибок', () => {
		const circle = TestRenderer.create(<Circle isSmall={true} />).toJSON()

		expect(circle).toMatchSnapshot()
	})

	it('Circle в состоянии default рендерится без ошибок', () => {
		const circle = TestRenderer.create(<Circle state={ElementStates.Default} />).toJSON()

		expect(circle).toMatchSnapshot()
	})

	it('Circle в состоянии changing рендерится без ошибок', () => {
		const circle = TestRenderer.create(<Circle state={ElementStates.Changing} />).toJSON()

		expect(circle).toMatchSnapshot()
	})

	it('Circle в состоянии modified рендерится без ошибок', () => {
		const circle = TestRenderer.create(<Circle state={ElementStates.Modified} />).toJSON()

		expect(circle).toMatchSnapshot()
	})
})