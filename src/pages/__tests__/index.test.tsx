import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../index'; 
import useItems from '@/hooks/UseItems';

jest.mock('@/hooks/UseItems', () => jest.fn());

const mockItems = [
  {
    id: 1,
    name: 'AK-47',
    image: '/ak47.png',
    price: 100,
    float: 0.15,
    category: 'Rifle',
  },
  {
    id: 2,
    name: 'M4A1-S',
    image: '/m4a1s.png',
    price: 200,
    float: 0.05,
    category: 'Rifle',
  },
];

describe('Home component', () => {
  beforeEach(() => {
    (useItems as jest.Mock).mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
    });
  });

  it('renders FilterBar, SortButtons, and items', () => {
    render(<Home />);

    expect(screen.getByText(/Sort by Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by Float/i)).toBeInTheDocument();

    expect(screen.getByText('AK-47')).toBeInTheDocument();
    expect(screen.getByText('M4A1-S')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    (useItems as jest.Mock).mockReturnValue({
      items: [],
      loading: false,
      error: 'Failed to fetch items',
    });

    render(<Home />);

    expect(screen.getByText(/Failed to fetch items/i)).toBeInTheDocument();
  });


  it('sorts items by price and float', async () => {
    render(<Home />);

    const sortPriceButton = screen.getByText(/Sort by Price/i);
    const sortFloatButton = screen.getByText(/Sort by Float/i);

    fireEvent.click(sortPriceButton);

    await waitFor(() => {
      const items = screen.getAllByRole('img');
      expect(items[0]).toHaveAttribute('alt', 'M4A1-S');
      expect(items[1]).toHaveAttribute('alt', 'AK-47');
    });

    fireEvent.click(sortFloatButton);

    await waitFor(() => {
      const items = screen.getAllByRole('img');
      expect(items[0]).toHaveAttribute('alt', 'AK-47');
      expect(items[1]).toHaveAttribute('alt', 'M4A1-S');
    });
  });

  it('displays "No items found" when no items match', async () => {
    (useItems as jest.Mock).mockReturnValue({
      items: [],
      loading: false,
      error: null,
    });

    render(<Home />);


    expect(screen.getByText(/No items found/i)).toBeInTheDocument();
  });
});
