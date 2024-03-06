import { render } from '@testing-library/react';
import DowntimePage from './index';

describe('DowntimePage component', () => {
  test('renders without crashing', () => {
    render(<DowntimePage />);
    // Test that the component renders without crashing
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
