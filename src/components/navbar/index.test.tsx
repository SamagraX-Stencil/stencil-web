import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Navbar } from './index'; // Adjust the import path as necessary



describe('Navbar', () => {
  it('toggles the sidebar when the menu icon is clicked', () => {

    render(
      <>
        <Navbar />
      </>
    );

    // Find the menu icon button and click it
    const menuButton = screen.getByLabelText('open drawer');
    fireEvent.click(menuButton);
    expect(menuButton).toBeInTheDocument();
  });
});
