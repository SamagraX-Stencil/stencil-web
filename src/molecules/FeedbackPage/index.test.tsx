import { render, fireEvent, screen } from '@testing-library/react'
import FeedbackPage from './index'

describe('Feedbackpage component', () => {

    test('render without crashing', () => {
        render(<FeedbackPage />);
    })


    // testing for rating section
    test('renders stars fields', () => {
        render(<FeedbackPage />)
        const stars = screen.getByTestId('ratingComponent')
        expect(stars).toBeInTheDocument()
    })

    test('allows rating value change', () => {
        render(<FeedbackPage />)
        
        const stars = screen.getByTestId('ratingComponent')
        expect(stars).toHaveAttribute('value', '1');
        
        fireEvent.change(stars, { target: { value: 3 } });
        expect(stars).toHaveAttribute('value', '3');

        fireEvent.change(stars, { target: { value: null } });
        expect(stars).toHaveAttribute('value', '0');
    })

    test('handle review button click', async () => {
        render(<FeedbackPage />);
        const stars = screen.getByTestId('ratingComponent')

        fireEvent.change(stars, { target: { value: 3 } });
        const reviewBtn1 = await screen.findByText('Submit Review')
        fireEvent.click(reviewBtn1)
        setTimeout(() => {
            expect(screen.findByText('Review sent successfully')).toBeInTheDocument()
        }, 2000);


        fireEvent.change(stars, { target: { value: null } });
        const reviewBtn2 = await screen.findByText('Submit Review')
        fireEvent.click(reviewBtn2)
        expect(screen.findByText('Please provide valid review')).toBeInTheDocument()
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

        fireEvent.change(textInput, {target: {value: 'Good website'}})

        expect(textInput).toHaveValue('Good Website')
    })

    test('handle review button click', async () => {
        render(<FeedbackPage />);
        const textInput = screen.getByPlaceholderText('Give positive/negative feedback for advisory')

        fireEvent.change(textInput, {target: {value: 'Good website'}})

        const reviewBtn = await screen.findByText('Submit Review')
        fireEvent.click(reviewBtn)

        setTimeout(() => {
            expect(screen.findByText('Review sent successfully')).toBeInTheDocument()
        }, 2000);
    })

})