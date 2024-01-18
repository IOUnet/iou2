import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    iou: {
      text: "#263238",
    },
    primary: {
      main: "#5193b1",
    },
  },
});

export default responsiveFontSizes(theme);
