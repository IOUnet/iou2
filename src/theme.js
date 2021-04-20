import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#455EAB',
    },
  },
});

export default responsiveFontSizes(theme);
