import { render, screen } from '@testing-library/react';
import FAQPage from './index';


describe('FAQ component', () => {
  test('renders without crashing', () => {
    render(<FAQPage />);
    // Test that the component renders without crashing
  });

  test('displays "FAQ Title" text', () => {
    const { getByText } = render(<FAQPage />);
    const textElement = getByText(/FAQs/i);
    expect(textElement).toBeInTheDocument();
  });

  test('displays "Contact description" text', () => {
    const { getByText } = render(<FAQPage />);
    const textElement = getByText(/To connect with call centre/i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders contact button correctly', () => {
    render(<FAQPage />);
    const buttonElement = screen.getByText('Dial 155333');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders Manual User button correctly', () => {
    render(<FAQPage />);
    const buttonElement = screen.getByText('User Manual - For VAWs');
    expect(buttonElement).toBeInTheDocument();
  });
});
