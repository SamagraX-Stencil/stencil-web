import { fireEvent, render, screen } from '@testing-library/react';
import FAQPage from './index';
import {component} from './config.json';
import { vi } from 'vitest';


describe('FAQ component', () => {
  test('renders without crashing', () => {
    render(<FAQPage />);
    // Test that the component renders without crashing
  });

  test('displays "FAQ Title" text', () => {
    const { getByText } = render(<FAQPage />);
    const textElement = getByText(component.title ?? "Faq");
    expect(textElement).toBeInTheDocument();
  });

  test('displays "Contact description" text', () => {
    const { getByText } = render(<FAQPage />);
    const textElement = getByText(component.contactDescriptionText ?? "contact description");
    expect(textElement).toBeInTheDocument();
  });

  test('renders contact button correctly', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<FAQPage />);
    const buttonElement = screen.getByText(component.contactText ?? "Contact User");

    // Simulate a button click
  fireEvent.click(buttonElement);
  
  // Expect the console.log to be called with the expected value
  expect(consoleSpy).toHaveBeenCalledWith(component.contactText ?? "Contact User");
  });


  test('renders Manual User button correctly', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<FAQPage />);
    const buttonElement = screen.getByText(component.userManualText ?? "User Manual");
    fireEvent.click(buttonElement);
  
  // Expect the console.log to be called with the expected value
  expect(consoleSpy).toHaveBeenCalledWith(component.userManualText ?? "User Manual");
  });

});
