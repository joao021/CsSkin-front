import { useState } from "react";
import {
  Box,
  Input,
  Select,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  VStack,
} from "@chakra-ui/react";

interface FilterBarProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFloatChange: (min: number, max: number) => void;
  onPriceChange: (min: number, max: number) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onSearch,
  onCategoryChange,
  onFloatChange,
  onPriceChange,
}) => {
  const [floatRange, setFloatRange] = useState<[number, number]>([0, 1]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const handlePriceChange = (newRange: [number, number]) => {
    onPriceChange(newRange[0], newRange[1]);
  };

  const handlePriceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: 0 | 1
  ) => {
    const value = parseFloat(e.target.value);
  
    setPriceRange((prev) => {
      const newRange = [...prev] as [number, number]; 
      newRange[index] = isNaN(value) ? 0 : value;
      handlePriceChange(newRange); 
      return newRange;
    });
  };
  

  const handleFloatChange = (values: [number, number]) => {
    setFloatRange(values);
    onFloatChange(values[0], values[1]);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Text mb="2" color="gray.100">
          Search by name:
        </Text>
        <Input
          placeholder="Enter skin name"
          onChange={onSearch}
          color="gray.100"
        />
      </Box>

      <Box>
        <Text mb="2" color="gray.100">
          Category:
        </Text>
        <Select onChange={onCategoryChange} color="gray.100" bg="gray.700">
          <option value="">All Categories</option>
          <option value="rifle">rifle</option>
          <option value="sniper">sniper</option>
        </Select>
      </Box>

      <Box>
        <Text mb="2" color="gray.100">
          Float Range:
        </Text>
        <RangeSlider
          aria-label={["min", "max"]}
          defaultValue={[0, 1]}
          min={0}
          max={1}
          step={0.01}
          onChangeEnd={handleFloatChange}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <Text color="gray.100">
          Min: {floatRange[0]} - Max: {floatRange[1]}
        </Text>
      </Box>

      <Box>
        <Text mb="2" color="gray.100">
          Price Range:
        </Text>
        <Box display="flex" gap="2">
          <Input
            placeholder="Min price"
            value={priceRange[0]}
            onChange={(e) => handlePriceInputChange(e, 0)}
            type="number"
            color="gray.100"
            bg="gray.700"
          />
          <Input
            placeholder="Max price"
            value={priceRange[1]}
            onChange={(e) => handlePriceInputChange(e, 1)}
            type="number"
            color="gray.100"
            bg="gray.700"
          />
        </Box>
        <Text color="gray.100">
          Min: ${priceRange[0]} - Max: ${priceRange[1]}
        </Text>
      </Box>
    </VStack>
  );
};

export default FilterBar;
