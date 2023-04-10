import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    custom: {
      100: "#your-lightest-color",
      200: "#your-light-color",
      300: "#your-medium-color",
      400: "#your-dark-color",
      500: "#your-darkest-color",
    },
  },
});

export default customTheme;
