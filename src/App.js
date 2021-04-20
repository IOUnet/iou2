import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        App
      </div>
    </ThemeProvider>
  );
}

export default App;
