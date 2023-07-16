import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    githubButton: {
      50:"#000000",
      100: "#000000",
      200: "#FF00FF",//dark mode 버튼 color
      300: "#CCFF00",//dark mode hovered color
      400: "#663333",//dark mode clicked color
      500: "#666666",//light mode 버튼 color
      600: "#009900",//light mode hovered color
      700: "#FF00FF",//light mode clicked color
      800: "#000000",
      900: "#000000",
    }
  }
});

export default theme;