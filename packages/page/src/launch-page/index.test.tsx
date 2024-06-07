 

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LaunchPage from './index';

 
jest.mock('@repo/hooks', () => ({
  useUiConfig: jest.fn(),
  useColorPalates: jest.fn(),
}));

const mockUseUiConfig = require('@repo/hooks').useUiConfig;
const mockUseColorPalates = require('@repo/hooks').useColorPalates;

describe('LaunchPage', () => {
  beforeEach(() => {
   
    mockUseUiConfig.mockReturnValue({
      logo: 'https://example.com/logo.png',
      label: 'KrushakOdisha',
    });

    
    mockUseColorPalates.mockReturnValue({
      primary: {
        main: '#ffffff',
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with the correct data', () => {
    const { getByAltText, getByText } = render(<LaunchPage />);

     
    const logoImage = getByAltText('KrushakOdisha');
    expect(logoImage).toHaveAttribute('src', 'https://example.com/logo.png');
    expect(logoImage).toHaveAttribute('width', '220');
    expect(logoImage).toHaveAttribute('height', '233');

 
    expect(getByText('KrushakOdisha')).toBeInTheDocument();
  });

  it('applies the correct background color', () => {
    const { container } = render(<LaunchPage />);
    expect(container.firstChild).toHaveStyle('background: #ffffff');
  });
});
