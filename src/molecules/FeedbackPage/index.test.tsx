import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import FeedbackPage from './index'

describe('Feedbackpage component', () => {

    test('render without crashing', () => {
        render(<FeedbackPage />);
    })


    // testing for rating section
    test('renders stars fields', () => {
        render(<FeedbackPage />)
        const starsLabel = screen.getByText('Did you find this useful?', {exact: false})

        // @ts-ignore
        const starsComponent = starsLabel.parentElement.querySelector('input');
        expect(starsComponent).toBeInTheDocument()
    })

    test('allows rating value change', async () => {
        render(<FeedbackPage />)
        
        const starsLabel = screen.getByText('Did you find this useful?', {exact: false})
        // @ts-ignore
        const starsComponent = starsLabel.parentElement.querySelector('input');
        // @ts-ignore
        expect(starsComponent.value).toBe('1')
        // @ts-ignore
        fireEvent.change(starsComponent, { target: { value: 3 } });
        // @ts-ignore
        expect(starsComponent.value).toBe('3')
    })



    test('handle review button click', async () => {
        render(<FeedbackPage />);
        const starsLabel = screen.getByText('Did you find this useful?', {exact: false})
        // @ts-ignore
        const starsComponent = starsLabel.parentElement.querySelector('input');
        // @ts-ignore
        fireEvent.change(starsComponent, { target: { value: 3 } });
        
        const reviewBtn = await waitFor(() => screen.getByTestId('ratingBtn')) as HTMLButtonElement;
        fireEvent.click(reviewBtn)

        setInterval(() => {
            screen.findByText('Review sent successfully')
        }, 2000)
    })



    // testing for review section
    test('renders correct input fields', () => {
        render(<FeedbackPage />);
        const textInput = screen.getByPlaceholderText('Give positive/negative feedback for advisory')

        expect(textInput).toBeInTheDocument()
    })

    test('allows entring review', () => {
        render(<FeedbackPage />);
        const textInput = screen.getByPlaceholderText('Give positive/negative feedback for advisory')

        fireEvent.change(textInput, {target: {value: 'Good Website'}})

        expect(textInput).toHaveValue('Good Website')
    })

    test('handle review button click', async () => {
        render(<FeedbackPage />);
        const textInput = screen.getByPlaceholderText('Give positive/negative feedback for advisory')

        fireEvent.change(textInput, {target: {value: 'Good Website'}})

        const reviewBtn = await waitFor(() => screen.getByTestId('reviewBtn')) as HTMLButtonElement;
        fireEvent.click(reviewBtn)

        setInterval(() => {
            screen.findByText('Review sent successfully')
        }, 2000)
    })

})