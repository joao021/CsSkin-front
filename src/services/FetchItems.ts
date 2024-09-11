import { Item } from "@/types";
import { api } from "@/lib/api";

export const fetchItems = async (filters: {
  name?: string;
  floatMin?: number;
  floatMax?: number;
  priceMin?: number;
  priceMax?: number;
  category?: string;
  sort?: "price" | "float";
}): Promise<Item[]> => {
  try {
    const queryString = new URLSearchParams({
      ...(filters.name && { name: filters.name }),
      ...(filters.floatMin !== undefined && {
        floatMin: filters.floatMin.toString(),
      }),
      ...(filters.floatMax !== undefined && {
        floatMax: filters.floatMax.toString(),
      }),
      ...(filters.priceMin !== undefined && {
        priceMin: filters.priceMin.toString(),
      }),
      ...(filters.priceMax !== undefined && {
        priceMax: filters.priceMax.toString(),
      }),
      ...(filters.category && { category: filters.category }),
      ...(filters.sort && { sort: filters.sort }),
    }).toString();

    const url = `http://localhost:3000/items?${queryString}`;

    const data: Item[] = await api.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};
