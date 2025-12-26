import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
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
