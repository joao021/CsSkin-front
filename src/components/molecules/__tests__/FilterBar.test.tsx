import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../FilterBar';
import { useCategories } from '@/hooks/UseCategories';

jest.mock('@/hooks/UseCategories');

describe('FilterBar Component', () => {
  const mockUseCategories = useCategories as jest.MockedFunction<
    typeof useCategories
  >;

  const mockProps = {
    onSearch: jest.fn(),
    onCategoryChange: jest.fn(),
    onFloatChange: jest.fn(),
    onPriceChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render search input, category select, float range slider, and price inputs', () => {
    mockUseCategories.mockReturnValue({
      categories: ['Rifle', 'Sniper'],
      loading: false,
      error: null,
    });

    render(<FilterBar {...mockProps} />);

    expect(screen.getByPlaceholderText('Enter skin name')).toBeInTheDocument();

    expect(screen.getByText('Category:')).toBeInTheDocument();

    expect(screen.getByText('Float Range:')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Min price')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Max price')).toBeInTheDocument();
  });

  it('should call onSearch when the search input changes', () => {
    render(<FilterBar {...mockProps} />);

    const searchInput = screen.getByPlaceholderText('Enter skin name');
    fireEvent.change(searchInput, { target: { value: 'AWP' } });

    expect(mockProps.onSearch).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should call onCategoryChange when the category changes', () => {
    mockUseCategories.mockReturnValue({
      categories: ['Rifle', 'Sniper'],
      loading: false,
      error: null,
    });

    render(<FilterBar {...mockProps} />);

    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'Sniper' } });

    expect(mockProps.onCategoryChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should call onPriceChange when price inputs change', () => {
    render(<FilterBar {...mockProps} />);

    const minPriceInput = screen.getByPlaceholderText('Min price');
    const maxPriceInput = screen.getByPlaceholderText('Max price');

    fireEvent.change(minPriceInput, { target: { value: '50' } });
    fireEvent.change(maxPriceInput, { target: { value: '500' } });

    expect(mockProps.onPriceChange).toHaveBeenCalledWith(50, 500);
  });

  it('should display loading text while categories are loading', () => {
    mockUseCategories.mockReturnValue({
      categories: [],
      loading: true,
      error: null,
    });

    render(<FilterBar {...mockProps} />);

    expect(screen.getByText('Loading categories...')).toBeInTheDocument();
  });

  it('should display error message when there is an error loading categories', () => {
    mockUseCategories.mockReturnValue({
      categories: [],
      loading: false,
      error: 'Error loading categories',
    });

    render(<FilterBar {...mockProps} />);

    expect(screen.getByText('Error loading categories')).toBeInTheDocument();
  });
});
