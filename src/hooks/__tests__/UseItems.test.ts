import { renderHook } from '@testing-library/react';
import useItems from '@/hooks/UseItems';
import { fetchItems } from '@/services/FetchItems';
import { Item, Filters } from '@/types';
import { waitFor } from '@testing-library/react';

jest.mock('@/services/FetchItems');
const mockedFetchItems = fetchItems as jest.MockedFunction<typeof fetchItems>;

describe('useItems hook', () => {
  const mockItems: Item[] = [
    { id: 1, name: 'Item 1', category: 'Category 1', float: 0.1, price: 10 },
    { id: 2, name: 'Item 2', category: 'Category 2', float: 0.2, price: 20 },
  ];

  const mockFilters: Filters = {
    name: '',
    floatMin: 0,
    floatMax: 1,
    priceMin: 0,
    priceMax: 100,
    category: '',
    sort: 'price',
  };

  beforeEach(() => {
    mockedFetchItems.mockReset();
  });

  it('should return items after successful fetch with debounce', async () => {
    mockedFetchItems.mockResolvedValue(mockItems);

    const { result } = renderHook(() => useItems(mockFilters));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.items).toEqual(mockItems);
    });

    expect(result.current.error).toBeNull();
  });

  it('should handle fetch failure', async () => {
    mockedFetchItems.mockRejectedValue(new Error('Failed to fetch'));

    const { result } = renderHook(() => useItems(mockFilters));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.error).toBe('Failed to load items.');
  });

  it('should debounce the filters update', async () => {
    mockedFetchItems.mockResolvedValue(mockItems);

    const { result, rerender } = renderHook(
      ({ filters }) => useItems(filters),
      {
        initialProps: { filters: mockFilters },
      },
    );

    const updatedFilters: Filters = { ...mockFilters, name: 'Item 1' };
    rerender({ filters: updatedFilters });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.items).toEqual(mockItems);
    });
  });
});
