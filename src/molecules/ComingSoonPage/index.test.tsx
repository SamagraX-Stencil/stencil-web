import { render, screen} from '@testing-library/react';
import ComingSoonPage from './index';
import config from './config.json';

describe('Coming Soon component', () => {
  test('renders without crashing', () => {
    render(<ComingSoonPage />);
  });

  test('displays "Coming Soon Title" text', () => {
    const { getByText } = render(<ComingSoonPage />);
    const textElement = getByText(config.component.title);
    expect(textElement).toBeInTheDocument();
  });

  test('displays "Description" text', () => {
    const { getByText } = render(<ComingSoonPage />);
    const textElement = getByText(config.component.description);
    expect(textElement).toBeInTheDocument();
  });

  test('renders button correctly', () => {
    render(<ComingSoonPage />);
    const buttonElement = screen.getByText(config.component.backText);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders coming soon image with correct src and alt text', () => {
  const src = config.component.comingSoonImage;
  const alt = 'hourGlass';

  const { getByAltText } = render(<ComingSoonPage />);

  const imageElement = getByAltText(alt);
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('src', src);
});

});
