import { render, screen } from '@testing-library/react';
import DowntimePage from './index';

describe('DowntimePage component', () => {
  test('renders without crashing', () => {
    render(<DowntimePage />);
    // Test that the component renders without crashing
  });

  test('displays "Downtime Title" text', () => {
    const { getByText } = render(<DowntimePage />);
    const textElement = getByText(/We're under maintainance/i);
    expect(textElement).toBeInTheDocument();
  });

  test('displays "Supporting text" text', () => {
    const { getByText } = render(<DowntimePage />);
    const textElement = getByText(/Have an urgent query?/i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders contact button correctly', () => {
    render(<DowntimePage />);
    const buttonElement = screen.getByText('Call Ama Krushi');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders refresh button correctly', () => {
    render(<DowntimePage />);
    const buttonElement = screen.getByText('Try Again');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders previous button correctly', () => {
    render(<DowntimePage />);
    const buttonElement = screen.getByText('Previous Page');
    expect(buttonElement).toBeInTheDocument();
  });

//   test('should reload the page when the button is clicked', () => {
//   const reloadSpy = jest.spyOn(window.location, 'reload').mockImplementation(() => {});

//   const { getByTestId } = render(<DowntimePage />);

//   const reloadButton = getByTestId('reloadButton');
//   reloadButton.click();

//   expect(reloadSpy).toHaveBeenCalled();

//   reloadSpy.mockRestore();
// });

});
