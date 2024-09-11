import { Container, Grid, Spinner, Text } from "@chakra-ui/react";
import SkinCard from "@/components/organisms/SkinCard";
import FilterBar from "@/components/molecules/FilterBar";
import useItems from "@/hooks/UseItems";
import { Filters } from "@/types";
import SortButtons from "@/components/molecules/SortSelector";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [filters, setFilters] = useState<Filters>({
    name: "",
    floatMin: 0,
    floatMax: 1,
    priceMin: 0,
    priceMax: 1000,
    category: "",
    sort: "price",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortedItems, setSortedItems] = useState<any[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedSearch = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "");
    setSearchTerm(sanitizedSearch);
  };

  useEffect(() => {
    if (searchTerm.length >= 3 || searchTerm === "") {
      setFilters((prev) => ({ ...prev, name: searchTerm }));
    }
  }, [searchTerm]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleFloatChange = (min: number, max: number) => {
    setFilters((prev) => ({
      ...prev,
      floatMin: min,
      floatMax: max,
    }));
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters((prev) => ({
      ...prev,
      priceMin: min,
      priceMax: max,
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
