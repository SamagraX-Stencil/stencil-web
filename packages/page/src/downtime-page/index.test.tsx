import { fireEvent, render, screen } from '@testing-library/react';
import DowntimePage from './index';
import { vi } from 'vitest';
import { useUiConfig } from '@repo/hooks';

describe('DowntimePage component', () => {
  const config = useUiConfig('component', 'downtime');
  test('renders without crashing', () => {
    render(<DowntimePage />);
    // Test that the component renders without crashing
  });

  test('displays "Downtime Title" text', () => {
    const { getByText } = render(<DowntimePage />);
    const textElement = getByText(config.title ?? 'Downtime');
    expect(textElement).toBeInTheDocument();
  });

  test('displays "Supporting text" text', () => {
    const { getByText } = render(<DowntimePage />);
    const textElement = getByText(config.supportingText ?? 'Description');
    expect(textElement).toBeInTheDocument();
  });

  test('renders contact button correctly', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<DowntimePage />);
    const buttonElement = screen.getByText(config.contactLink ?? 'Contact Details');
    // expect(buttonElement).toBeInTheDocument();

    // Simulate a button click
    fireEvent.click(buttonElement);

    // Expect the console.log to be called with the expected value
    expect(consoleSpy).toHaveBeenCalledWith(config.contactLink ?? 'Contact Details');
  });

  test('renders refresh button correctly', async () => {
    // const reloadSpy = vi.fn(window.location.reload);
    // const reloadSpy = vi.spyOn(DowntimePage.prototype, 'handleRefreshClick')
    const consoleSpy = vi.spyOn(console, 'log');
    render(<DowntimePage />);
    const buttonElement = screen.getByText(config.refreshText ?? 'Reload Page');
    await fireEvent.click(buttonElement);
    expect(consoleSpy).toHaveBeenCalledWith(config.refreshText ?? 'Reload Page');
    // expect(reloadSpy).toHaveBeenCalled();
  });

  test('renders previous button correctly', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<DowntimePage />);
    const buttonElement = screen.getByText(config.previousPageText ?? 'Previous Page');
    fireEvent.click(buttonElement);
    expect(consoleSpy).toHaveBeenCalledWith(config.previousPageText ?? 'Previous Page');
  });

  test('renders downtime image with correct src and alt text', () => {
    const src = config.downTimeImage;
    const alt = 'downtimeGif';

    const { getByAltText } = render(<DowntimePage />);

    const imageElement = getByAltText(alt);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', src);
  });

  //   test('try again button reloads the page when clicked', () => {
  //   const reloadSpy = jest.spyOn(window.location, 'reload').mockImplementation(() => {});

  //   const { getByText } = render(<DowntimePage />);

  //   fireEvent.click(getByText(config.component.refreshText));

  //   expect(reloadSpy).toHaveBeenCalled();

  //   reloadSpy.mockRestore();
  // });
});
