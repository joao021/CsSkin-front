import { useState } from "react";
import useItems from "@/hooks/UseItems";
import SkinCard from "../organisms/SkinCard";
import { Input, Select, Button, VStack, Spinner, Text } from "@chakra-ui/react";

const ItemList = () => {
  const [filters, setFilters] = useState({
    name: "",
    floatMin: undefined,
    floatMax: undefined,
    priceMin: undefined,
    priceMax: undefined,
    category: "",
    sort: undefined,
  });

  const { items, loading, error } = useItems(filters);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value || undefined,
    }));
  };

  const handleSubmit = () => {
  };

  return (
    <VStack spacing="4" align="start" width="100%">
      <Input
        name="name"
        placeholder="Search by name"
        value={filters.name}
        onChange={handleChange}
      />
      <Input
        name="floatMin"
        type="number"
        placeholder="Min Float"
        value={filters.floatMin || ""}
        onChange={handleChange}
      />
      <Input
        name="floatMax"
        type="number"
        placeholder="Max Float"
        value={filters.floatMax || ""}
        onChange={handleChange}
      />
      <Input
        name="priceMin"
        type="number"
        placeholder="Min Price"
        value={filters.priceMin || ""}
        onChange={handleChange}
      />
      <Input
        name="priceMax"
        type="number"
        placeholder="Max Price"
        value={filters.priceMax || ""}
        onChange={handleChange}
      />
      <Select
        name="category"
        placeholder="Category"
        value={filters.category || ""}
        onChange={handleChange}
      >
        <option value="rifle">Rifle</option>
        <option value="sniper">Sniper</option>
      </Select>
      <Select
        name="sort"
        placeholder="Sort by"
        value={filters.sort || ""}
        onChange={handleChange}
      >
        <option value="price">Price</option>
        <option value="float">Float</option>
      </Select>
      <Button onClick={handleSubmit}>Apply Filters</Button>

      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <VStack spacing="4" width="100%">
          {items.map((item) => (
            <SkinCard
              key={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              float={item.float}
              category={item.category}
            />
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default ItemList;
