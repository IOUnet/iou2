import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/home-page/HomePage';
import { ROUTES } from './constants';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route component={HomePage} exact path={ROUTES.main} />
          <Redirect to={ROUTES.main} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
