import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    background: {
      default: "#ffffe9",
    },
    primary: {
      light: "#fffffb",
      main: "#E5CEB7",
      dark: "#b39d87",
      contrastText: "#000",
    },
    secondary: {
      light: "#ffffe9",
      main: "#ffffe9",
      dark: "#b39d87",
      contrastText: "#000",
    },
    openTitle: "#000",
    protectedTitle: "#000",
    type: "light",
  },
});

export default theme;
