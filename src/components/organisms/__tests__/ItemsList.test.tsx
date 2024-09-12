import { render, screen, fireEvent } from '@testing-library/react';
import ItemList from '../ItemsList';
import useItems from '@/hooks/UseItems';
import { Item } from '@/types';

jest.mock('@/hooks/UseItems');

const mockUseItems = useItems as jest.MockedFunction<typeof useItems>;

describe('ItemList Component', () => {
  const mockItems: Item[] = [
    {
      id: 1,
      name: 'AK-47 | Redline',
      category: 'Rifle',
      price: 150,
      float: 0.15,
      image: 'ak47.png',
    },
    {
      id: 2,
      name: 'AWP | Dragon Lore',
      category: 'Sniper',
      price: 2000,
      float: 0.05,
      image: 'awp.png',
    },
  ];

  beforeEach(() => {
    mockUseItems.mockClear();
  });

  it('should display items when loading is complete', () => {
    mockUseItems.mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
    });

    render(<ItemList />);

    expect(screen.getByText('AK-47 | Redline')).toBeInTheDocument();
    expect(screen.getByText('AWP | Dragon Lore')).toBeInTheDocument();
  });

  it('should display an error message if loading fails', () => {
    mockUseItems.mockReturnValue({
      items: [],
      loading: false,
      error: 'Failed to load items',
    });

    render(<ItemList />);

    expect(screen.getByText('Failed to load items')).toBeInTheDocument();
  });

  it('should apply filters when "Apply Filters" button is clicked', () => {
    mockUseItems.mockReturnValue({
      items: [],
      loading: false,
      error: null,
    });

    render(<ItemList />);

    const nameInput = screen.getByPlaceholderText('Search by name');
    fireEvent.change(nameInput, { target: { value: 'AK' } });
    expect(nameInput).toHaveValue('AK');

    const applyButton = screen.getByText('Apply Filters');
    fireEvent.click(applyButton);

  });
});
