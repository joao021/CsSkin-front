import { Item } from '@/types';
import { api } from '@/lib/api';

export const fetchItems = async (filters: {
  name?: string;
  floatMin?: number;
  floatMax?: number;
  priceMin?: number;
  priceMax?: number;
  category?: string;
  sort?: 'price' | 'float';
}): Promise<Item[]> => {
  try {
    const queryString = new URLSearchParams(
      Object.entries(filters)
        .filter(
          ([_, value]) => value !== undefined && value !== '' && value !== 0,
        )
        .reduce((acc, [key, value]) => {
          acc[key] = value.toString();
          return acc;
        }, {} as Record<string, string>),
    ).toString();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/items?${queryString}`;

    const data: Item[] = await api.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};
