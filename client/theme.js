import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h4: {
      fontFamily: "Lekton",
    },
    h5: {
      fontFamily: "Lekton",
    },
    h6: {
      fontFamily: "Lekton",
    },
    fontFamily: [
      "Montserrat",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
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
      main: "#000",
      dark: "#B79B84",
      contrastText: "#000",
    },
    openTitle: "#000",
    protectedTitle: "#000",
    type: "light",
  },
});

export default theme;
