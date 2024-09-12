import { fetchItems } from '../FetchItems';
import { api } from '@/lib/api';
import { Item } from '@/types';

jest.mock('@/lib/api');

const mockApiGet = api.get as jest.Mock;

describe('fetchItems', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeAll(() => {
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000';
  });

  afterAll(() => {
    delete process.env.NEXT_PUBLIC_API_URL;
  });

  it('should fetch items with the correct filters', async () => {
    const mockData: Item[] = [
      {
        id: '1',
        name: 'AK-47 | Redline',
        image: 'https://example.com/ak47_redline.png',
        category: 'rifle',
        float: '0.05',
        price: 120,
        createdAt: '2024-09-11T01:30:27.868Z',
        updatedAt: '2024-09-11T01:30:27.868Z',
      },
    ];

    mockApiGet.mockResolvedValueOnce(mockData);

    const filters = {
      name: 'AK-47',
      floatMin: 0.01,
      floatMax: 1.0,
      priceMin: 100,
      priceMax: 200,
      category: 'rifle',
      sort: 'price',
    };

    const result = await fetchItems(filters);

    expect(mockApiGet).toHaveBeenCalledWith(
      'http://localhost:3000/items?name=AK-47&floatMin=0.01&floatMax=1&priceMin=100&priceMax=200&category=rifle&sort=price',
    );
    expect(result).toEqual(mockData);
  });

  it('should fetch items without any filters', async () => {
    const mockData: Item[] = [
      {
        id: '1',
        name: 'AK-47 | Redline',
        image: 'https://example.com/ak47_redline.png',
        category: 'rifle',
        float: '0.05',
        price: 120,
        createdAt: '2024-09-11T01:30:27.868Z',
        updatedAt: '2024-09-11T01:30:27.868Z',
      },
    ];

    mockApiGet.mockResolvedValueOnce(mockData);

    const filters = {};

    const result = await fetchItems(filters);

    expect(mockApiGet).toHaveBeenCalledWith('http://localhost:3000/items?');
    expect(result).toEqual(mockData);
  });

  it('should handle API errors', async () => {
    mockApiGet.mockRejectedValueOnce(new Error('API Error'));

    const filters = {
      name: 'AK-47',
    };

    await expect(fetchItems(filters)).rejects.toThrow('API Error');
  });
});
