import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    iou: {
      text: '#263238',
    },
    primary: {
      main: '#455EAB',
    },
  },
});

export default responsiveFontSizes(theme);
