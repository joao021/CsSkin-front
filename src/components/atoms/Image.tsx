import { Image as ChakraImage, ImageProps } from "@chakra-ui/react";

const Image: React.FC<ImageProps> = (props) => {
  return <ChakraImage {...props} />;
};

export default Image;
