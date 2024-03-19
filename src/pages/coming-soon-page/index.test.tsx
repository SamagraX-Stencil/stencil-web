import { fireEvent, render, screen} from '@testing-library/react';
import ComingSoonPage from './index';
import {component} from './config.json';
import { vi } from 'vitest';

describe('Coming Soon component', () => {
  test('renders without crashing', () => {
    render(<ComingSoonPage />);
  });

  test('displays "Coming Soon Title" text', () => {
    const { getByText } = render(<ComingSoonPage />);
    const textElement = getByText(component.title ?? "Coming Soon");
    expect(textElement).toBeInTheDocument();
  });

  test('displays "Description" text', () => {
    const { getByText } = render(<ComingSoonPage />);
    const textElement = getByText(component.description ?? "Coming Soon Description");
    expect(textElement).toBeInTheDocument();
  });

  test('renders back button correctly', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<ComingSoonPage />);
    const buttonElement = screen.getByText(component.backText ?? "Back Button");
    fireEvent.click(buttonElement);
     expect(consoleSpy).toHaveBeenCalledWith(component.backText ?? "Back Button");
  });


});
