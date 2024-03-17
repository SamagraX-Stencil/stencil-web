import { render, screen } from '@testing-library/react';
import FAQPage from './index';
import config from './config.json';


describe('FAQ component', () => {
  test('renders without crashing', () => {
    render(<FAQPage />);
    // Test that the component renders without crashing
  });

  test('displays "FAQ Title" text', () => {
    const { getByText } = render(<FAQPage />);
    const textElement = getByText(config.component.title);
    expect(textElement).toBeInTheDocument();
  });

  test('displays "Contact description" text', () => {
    const { getByText } = render(<FAQPage />);
    const textElement = getByText(config.component.contactDescriptionText);
    expect(textElement).toBeInTheDocument();
  });

  test('renders contact button correctly', () => {
    render(<FAQPage />);
    const buttonElement = screen.getByText(config.component.contactText);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders Manual User button correctly', () => {
    render(<FAQPage />);
    const buttonElement = screen.getByText(config.component.userManualText);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders downtime image with correct src and alt text', () => {
  const src = config.component.contactIcon;
  const alt = 'callIcon';

  const { getByAltText } = render(<FAQPage />);

  const imageElement = getByAltText(alt);
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('src', src);
});

});
