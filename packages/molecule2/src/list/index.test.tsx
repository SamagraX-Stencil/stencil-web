// import React from 'react';
// import { fireEvent, render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { List } from './index'; // Adjust the import path as necessary

// const mockOnClick = () => {};
// // Mock data
// const mockItems = [
//   {
//     id: '1',
//     label: 'Item 1',
//     icon: <div>Icon1</div>,
//     items: [
//       {
//         id: '1-1',
//         label: 'SubItem 1-1',
//       },
//     ],
//   },
//   {
//     id: '2',
//     label: 'Item 2',
//     onClick: mockOnClick,
//     avatar: 'avatar-url',
//     secondaryLabel: 'Secondary Label',
//   },
// ];

// describe('List component', () => {
//     it('renders with no items', () => {
//         const { getByText } = render(<List items={[]} noItem={{ label: 'No items found', icon: <div>NoIcon</div> }} />);
//         expect(getByText('No items found')).toBeInTheDocument();
//       });
      
//       it('renders with items', () => {
//         render(<List items={mockItems} />);
//         expect(screen.getByText('Item 1')).toBeInTheDocument();
//         expect(screen.getByText('Item 2')).toBeInTheDocument();
//       });
      
//       it('toggles item collapse on click', () => {
//         render(<List items={mockItems} />);
//         const item1 = screen.getByText('Item 1');
//         fireEvent.click(item1);
//         const subItem = screen.getByText('SubItem 1-1');
//         expect(subItem).toBeInTheDocument();
//         // Click again to collapse
//         fireEvent.click(item1);
//         expect(subItem).not.toBeVisible(); // You might need to adjust based on how you handle the collapse visibility
//       });
      
//   });