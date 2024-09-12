import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortButtons from '../SortSelector';

describe('SortButtons component', () => {
  it('renders two sort buttons', () => {
    const mockOnSort = jest.fn();
    render(<SortButtons onSort={mockOnSort} />);

    const priceButton = screen.getByText(/Sort by Price/i);
    const floatButton = screen.getByText(/Sort by Float/i);

    expect(priceButton).toBeInTheDocument();
    expect(floatButton).toBeInTheDocument();
  });

  it('calls onSort with correct arguments when sorting by price', () => {
    const mockOnSort = jest.fn();
    render(<SortButtons onSort={mockOnSort} />);

    const priceButton = screen.getByText(/Sort by Price/i);
    fireEvent.click(priceButton);

    expect(mockOnSort).toHaveBeenCalledWith('price', 'desc');
  });

  it('toggles sort direction on subsequent clicks for price', () => {
    const mockOnSort = jest.fn();
    render(<SortButtons onSort={mockOnSort} />);

    const priceButton = screen.getByText(/Sort by Price/i);

    fireEvent.click(priceButton);
    expect(mockOnSort).toHaveBeenCalledWith('price', 'desc');

    fireEvent.click(priceButton);
    expect(mockOnSort).toHaveBeenCalledWith('price', 'asc');
  });

  it('calls onSort with correct arguments when sorting by float', () => {
    const mockOnSort = jest.fn();
    render(<SortButtons onSort={mockOnSort} />);

    const floatButton = screen.getByText(/Sort by Float/i);
    fireEvent.click(floatButton);

    expect(mockOnSort).toHaveBeenCalledWith('float', 'desc');
  });

  it('toggles sort direction on subsequent clicks for float', () => {
    const mockOnSort = jest.fn();
    render(<SortButtons onSort={mockOnSort} />);

    const floatButton = screen.getByText(/Sort by Float/i);

    fireEvent.click(floatButton);
    expect(mockOnSort).toHaveBeenCalledWith('float', 'desc');

    fireEvent.click(floatButton);
    expect(mockOnSort).toHaveBeenCalledWith('float', 'asc');
  });

  it('sort direction state is updated correctly', () => {
    const mockOnSort = jest.fn();
    render(<SortButtons onSort={mockOnSort} />);

    const priceButton = screen.getByText(/Sort by Price/i);
    const floatButton = screen.getByText(/Sort by Float/i);

    expect(priceButton).toHaveTextContent('Sort by Price (asc)');
    expect(floatButton).toHaveTextContent('Sort by Float (asc)');

    fireEvent.click(priceButton);
    expect(priceButton).toHaveTextContent('Sort by Price (desc)');

    fireEvent.click(floatButton);
    expect(floatButton).toHaveTextContent('Sort by Float (desc)');
  });
});
