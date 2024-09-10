// src/styles/chakra.ts

import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#e3f9f7",
      100: "#c1e6e5",
      200: "#9fd3d2",
      300: "#7dc0bf",
      400: "#5aacae",
      500: "#419393",
      600: "#31726f",
      700: "#21504b",
      800: "#112e28",
      900: "#00100e",
    },
  },
});

export default theme;
