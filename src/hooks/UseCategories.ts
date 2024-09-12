import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) throw new Error('API URL is not defined');

        const response = await api.get(`${apiUrl}/items`);

        if (response) {

          const uniqueCategories: string[] = Array.from(
            new Set(
              response.map((item: { category: string }) => item.category),
            ),
          );

          setCategories(uniqueCategories);
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
