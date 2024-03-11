import { render, screen } from '@testing-library/react';
import DowntimePage from './index';
import config from './config.json';

describe('DowntimePage component', () => {
  test('renders without crashing', () => {
    render(<DowntimePage />);
    // Test that the component renders without crashing
  });

  test('displays "Downtime Title" text', () => {
    const { getByText } = render(<DowntimePage />);
    const textElement = getByText(config.component.title);
    expect(textElement).toBeInTheDocument();
  });

  test('displays "Supporting text" text', () => {
    const { getByText } = render(<DowntimePage />);
    const textElement = getByText(config.component.supportingText);
    expect(textElement).toBeInTheDocument();
  });

  test('renders contact button correctly', () => {
    render(<DowntimePage />);
    const buttonElement = screen.getByText(config.component.contactLink);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders refresh button correctly', () => {
    render(<DowntimePage />);
    const buttonElement = screen.getByText(config.component.refreshText);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders previous button correctly', () => {
    render(<DowntimePage />);
    const buttonElement = screen.getByText(config.component.previousPageText);
    expect(buttonElement).toBeInTheDocument();
  });

//   test('try again button reloads the page when clicked', () => {
//   const reloadSpy = jest.spyOn(window.location, 'reload').mockImplementation(() => {});

//   const { getByText } = render(<DowntimePage />);

//   fireEvent.click(getByText(config.component.refreshText));

//   expect(reloadSpy).toHaveBeenCalled();

//   reloadSpy.mockRestore();
// });

});
