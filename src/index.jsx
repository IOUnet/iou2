import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ChainWebProvider from './context/chain/ChainWebProvider'
import TagManager from 'react-gtm-module'
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StylesThemeProvider } from '@mui/styles';
import theme from './theme';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './wagmi';

const queryClient = new QueryClient();
 


const main = async () => {
  const tagManagerArgs = {
    gtmId: 'G-7D7W89BF1C'
}
 
  TagManager.initialize(tagManagerArgs)

  const container = document.getElementById('root');
  if (!container) throw new Error('Root container #root not found');
  const root = createRoot(container);
  root.render(
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider theme={theme}>
          <StylesThemeProvider theme={theme}>
            <CookiesProvider>
              <ChainWebProvider>
                <App />
              </ChainWebProvider>
            </CookiesProvider>
          </StylesThemeProvider>
        </MuiThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
  //serviceWorker.unregister();

};

main();

reportWebVitals();
