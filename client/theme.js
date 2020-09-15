import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    background: {
      default: "#f9f3e5",
    },
    primary: {
      light: "#fffffb",
      main: "#E5CEB7",
      dark: "#b39d87",
      contrastText: "#000",
    },
    secondary: {
      light: "#f9f3e5",
      main: "#f9f3e5",
      dark: "#b39d87",
      contrastText: "#000",
    },
    openTitle: "#000",
    protectedTitle: "#000",
    type: "light",
  },
});

export default theme;
