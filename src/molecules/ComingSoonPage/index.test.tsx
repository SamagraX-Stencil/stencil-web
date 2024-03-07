import { render, screen} from '@testing-library/react';
import ComingSoonPage from './index';

describe('Coming Soon component', () => {
  test('renders without crashing', () => {
    render(<ComingSoonPage />);
  });

  test('displays "Coming Soon Title" text', () => {
    const { getByText } = render(<ComingSoonPage />);
    const textElement = getByText(/Coming Soon!/i);
    expect(textElement).toBeInTheDocument();
  });

  test('displays "Description" text', () => {
    const { getByText } = render(<ComingSoonPage />);
    const textElement = getByText(/We are going to launch this feature very soon. Stay tuned!/i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders button correctly', () => {
    render(<ComingSoonPage />);
    const buttonElement = screen.getByText('Back');
    expect(buttonElement).toBeInTheDocument();
  });

});
