import { Select as ChakraSelect, SelectProps } from "@chakra-ui/react";

const Select: React.FC<SelectProps> = (props) => {
  return <ChakraSelect {...props} />;
};

export default Select;
