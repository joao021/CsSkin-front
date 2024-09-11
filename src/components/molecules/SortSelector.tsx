import React, { useState } from "react";
import { Button, HStack } from "@chakra-ui/react";

interface SortButtonsProps {
  onSort: (field: "price" | "float", direction: "asc" | "desc") => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({ onSort }) => {
  const [sortDirection, setSortDirection] = useState({
    price: "asc",
    float: "asc",
  });

  const handleSortClick = (field: "price" | "float") => {
    const newDirection = sortDirection[field] === "asc" ? "desc" : "asc";
    setSortDirection((prev) => ({
      ...prev,
      [field]: newDirection,
    }));

    onSort(field, newDirection);
  };

  return (
    <HStack spacing="4" mb={4}>
      <Button onClick={() => handleSortClick("price")}>
        Sort by Price ({sortDirection.price})
      </Button>
      <Button onClick={() => handleSortClick("float")}>
        Sort by Float ({sortDirection.float})
      </Button>
    </HStack>
  );
};

export default SortButtons;
