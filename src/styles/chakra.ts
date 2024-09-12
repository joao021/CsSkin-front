import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const themeConfig: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config: themeConfig,
  styles: {
    global: {
      body: {
        fontFamily: "Arial, sans-serif",
        lineHeight: "tall",
      },
    },
  },
});

export default theme;
