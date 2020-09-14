import { createMuiTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: "#fffffb",
      main: "#FFFFE9",
      dark: "#e8d0b3",
      contrastText: "#000",
    },
    secondary: {
      light: "#ffffe9",
      main: "#E5CEB7",
      dark: "#b39d87",
      contrastText: "#000",
    },
    openTitle: "#000",
    protectedTitle: "#000",
    type: "light",
  },
});

export default theme;
