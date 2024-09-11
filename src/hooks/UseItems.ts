import { useState, useEffect } from "react";
import { fetchItems } from "@/services/FetchItems";
import { Item, Filters } from "@/types";

const useItems = (filters: Filters, debounceDelay: number = 500) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, debounceDelay);

    return () => {
      clearTimeout(handler); 
    };
  }, [filters, debounceDelay]);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const data: Item[] = await fetchItems(debouncedFilters);
        setItems(data);
      } catch (err) {
        setError("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [debouncedFilters]);

  return { items, loading, error };
};

export default useItems;
