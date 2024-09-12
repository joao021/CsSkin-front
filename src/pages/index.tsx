import { Container, Grid, Spinner, Text } from "@chakra-ui/react";
import SkinCard from "@/components/organisms/SkinCard";
import FilterBar from "@/components/molecules/FilterBar";
import useItems from "@/hooks/UseItems";
import { Filters, Item } from "@/types";
import SortButtons from "@/components/molecules/SortSelector";
import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

const Home = () => {
  const [filters, setFilters] = useState<Filters>({
    name: "",
    floatMin: 0,
    floatMax: 1,
    priceMin: 0,
    priceMax: 0,
    category: "",
    sort: "price",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [sortedItems, setSortedItems] = useState<Item[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedSearch = e.target.value.toLowerCase();

    setSearchTerm(sanitizedSearch);
  };

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3 || debouncedSearchTerm === "") {
      setFilters((prev) => ({ ...prev, name: debouncedSearchTerm }));
    }
  }, [debouncedSearchTerm]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleFloatChange = (
    min: number | undefined,
    max: number | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      floatMin: min || 0,
      floatMax: max || 1,
    }));
  };

  const handlePriceChange = (
    min: number | undefined,
    max: number | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      priceMin: min || 0,
      priceMax: max || 0,
    }));
  };

  const { items, loading, error } = useItems(filters);

  const handleSort = (field: "price" | "float", direction: "asc" | "desc") => {
    const sorted = [...items].sort((a, b) => {
      const aValue = Number(a[field]) || 0;
      const bValue = Number(b[field]) || 0;

      return direction === "asc" ? aValue - bValue : bValue - aValue;
    });

    setSortedItems(sorted);
  };

  useEffect(() => {
    setSortedItems(items);
  }, [items]);

  return (
    <Container maxW="container.lg" p="4">
      <FilterBar
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onFloatChange={handleFloatChange}
        onPriceChange={handlePriceChange}
      />
      <SortButtons onSort={handleSort} />
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          {sortedItems.length === 0 ? (
            <Text>No items found</Text>
          ) : (
            sortedItems.map((item) => (
              <SkinCard
                key={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                float={item.float}
                category={item.category}
              />
            ))
          )}
        </Grid>
      )}
      {error && <Text color="red.500">{error}</Text>}
    </Container>
  );
};

export default Home;
