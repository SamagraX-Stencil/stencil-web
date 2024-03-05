import { render, fireEvent, screen } from '@testing-library/react';
import LoginMobileAadharPage from './index';


describe('LoginMobileAadharPage component', () => {
  test('renders without crashing', () => {
    render(<LoginMobileAadharPage />);
    // Test that the component renders without crashing
  });

  test('renders correct input fields', () => {
    render(<LoginMobileAadharPage />);
    const phoneInput = screen.getByText('Enter Phone Number');

    expect(phoneInput).toBeInTheDocument();
  });

  test('allows entering phone number', () => {
    render(<LoginMobileAadharPage />);
    const phoneInput = screen.getByLabelText('Enter Phone Number', {
      exact: false,
    }); // Need to use exact false here because of MUI

    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    expect(phoneInput).toHaveValue('1234567890');
  });

  test('allows entering aadhar number', async () => {
    render(<LoginMobileAadharPage />);
    const aadhaarBtn = await screen.findByText('Aadhar Number');
    fireEvent.click(aadhaarBtn); // Changing to aadhaar input method
    const aadharInput = screen.getByLabelText('Enter Aadhar Number', {
      exact: false,
    });

    fireEvent.change(aadharInput, { target: { value: '123456789012' } });

    expect(aadharInput).toHaveValue('123456789012');
  });


  test('displays error message for invalid phone number', async () => {
    render(<LoginMobileAadharPage />);
    // toast.success.mockImplementation(() => Promise.resolve('Successfully sent OTP'));
    const phoneInput = screen.getByLabelText('Enter Phone Number', {
      exact: false,
    });
    fireEvent.change(phoneInput, { target: { value: '123' } });

    const loginBtn = await screen.findByText('Login');
    fireEvent.click(loginBtn);
    setTimeout(() => {
      expect(screen.getByText('Please enter a valid input')).toBeInTheDocument()
    }, 2000);

  });

  test('displays error message for invalid aadhar number', async () => {
    render(<LoginMobileAadharPage />);
    const aadhaarBtn = await screen.findByText('Aadhar Number');
    fireEvent.click(aadhaarBtn);

    const aadharInput = screen.getByLabelText('Enter Aadhar Number', {
      exact: false,
    });

    fireEvent.change(aadharInput, { target: { value: '123' } });

    const loginBtn = await screen.findByText('Login');
    fireEvent.click(loginBtn);
    
    setTimeout(() => {
      expect(screen.findByText('Please enter a valid Aadhar number')).toBeInTheDocument()
    }, 2000);
  });

  test('handles login button click', async () => {
    render(<LoginMobileAadharPage />);
    const phoneInput = screen.getByLabelText('Enter Phone Number', {
      exact: false,
    });
    fireEvent.change(phoneInput, { target: { value: '9034350533' } });
    const loginBtn = await screen.findByText('Login');
    fireEvent.click(loginBtn);

    // await waitFor(() =>
    //   expect(screen.findByText('Successfully sent OTP')).toBeInTheDocument()
    // );
    setTimeout(() => {
      expect(screen.findByText('Successfully sent OTP')).toBeInTheDocument()
    }, 2000);
  });
});
