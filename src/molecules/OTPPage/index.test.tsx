import { render} from '@testing-library/react';
import OtpPage from './index';

describe('OtpPage component', () => {
  test('renders without crashing', () => {
    render(<OtpPage />);
  });

  test('displays "OTP Verification" text', () => {
    const { getByText } = render(<OtpPage />);
    const textElement = getByText(/OTP Verification/i);
    expect(textElement).toBeInTheDocument();
  });

  test('displays "Enter the verification code..." text', () => {
    const { getByText } = render(<OtpPage />);
    const textElement = getByText(/Enter the verification code we just sent on your mobile number/i);
    expect(textElement).toBeInTheDocument();
  });

  // TODO: Fix these tests
  // test('displays error message when form is submitted with invalid OTP', async () => {
  //   const { getByText, getByTestId } = render(<OtpPage />);
  //   const otpInput = getByTestId('otp-input');
  //   fireEvent.change(otpInput, { target: { value: '123' } });
  //   fireEvent.submit(otpInput);
  //   const errorMessage = await waitFor(() => getByText(/Please enter correct OTP/i));
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // test('displays success message when login is successful', async () => {
  //   jest.useFakeTimers();
  //   const { getByRole, getByText, getByTestId } = render(<OtpPage />);
  //   const otpInput = getByTestId('otp-input');
  //   fireEvent.change(otpInput, { target: { value: '1234' } });
  //   fireEvent.submit(otpInput);
  //   const loginButton = getByRole('button', { name: /Login/i });
  //   fireEvent.click(loginButton);
  //   jest.advanceTimersByTime(2000);
  //   const successMessage = await waitFor(() => getByText(/Successfully logged in/i));
  //   expect(successMessage).toBeInTheDocument();
  //   jest.useRealTimers();
  // });
});
