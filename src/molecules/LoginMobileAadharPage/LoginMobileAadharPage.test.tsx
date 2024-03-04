import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LoginMobileAadharPage from './index';

describe('LoginMobileAadharPage component', () => {
  test('renders without crashing', () => {
    render(<LoginMobileAadharPage />);
    // Test that the component renders without crashing
  });

  test('renders correct input fields', () => {
    render(<LoginMobileAadharPage />);
    const phoneInput = screen.getByLabelText('Enter Phone Number');
    const aadharInput = screen.getByLabelText('Enter Aadhar Number');

    expect(phoneInput).toBeInTheDocument();
    expect(aadharInput).toBeInTheDocument();
  });

  test('allows entering phone number', () => {
    render(<LoginMobileAadharPage />);
    const phoneInput = screen.getByLabelText('Enter Phone Number');

    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    expect(phoneInput).toHaveValue('1234567890');
  });

  test('allows entering aadhar number', () => {
    render(<LoginMobileAadharPage />);
    const aadharInput = screen.getByLabelText('Enter Aadhar Number');

    fireEvent.change(aadharInput, { target: { value: '123456789012' } });

    expect(aadharInput).toHaveValue('123456789012');
  });

  test('displays error message for invalid phone number', () => {
    render(<LoginMobileAadharPage />);
    const phoneInput = screen.getByLabelText('Enter Phone Number');

    fireEvent.change(phoneInput, { target: { value: '123' } });

    expect(screen.getByText('Please enter a valid mobile number')).toBeInTheDocument();
  });

  test('displays error message for invalid aadhar number', () => {
    render(<LoginMobileAadharPage />);
    const aadharInput = screen.getByLabelText('Enter Aadhar Number');

    fireEvent.change(aadharInput, { target: { value: '123' } });

    expect(screen.getByText('Please enter a valid Aadhar number')).toBeInTheDocument();
  });

  test('handles login button click', async () => {
    render(<LoginMobileAadharPage />);
    const loginButton = screen.getByText('Login');

    fireEvent.click(loginButton);

    // You may add more assertions here to test different scenarios after login button click
    await waitFor(() => expect(screen.getByText('Successfully sent OTP')).toBeInTheDocument());
  });

  // Add more tests as needed...
});
