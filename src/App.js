import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { useContext, useEffect } from 'react'

import HomePage from './pages/home-page/HomePage';
import MintSelectTokenPage from './pages/mint-select-token-page/MintSelectTokenPage';
import MintEditTokenPage from './pages/mint-edit-token-page/MintEditTokenPage';
import EditorIOUPage from './pages/editor-iou-page/EditorIOU';
import MintSelectReceiverPage from './pages/mint-select-receiver-page/MintSelectReceiverPage';
import MakeIOUToken1Page from './pages/make-iou-token1-page/MakeIOUToken1Page';
import MakeIOUToken2Page from './pages/make-iou-token2-page/MakeIOUToken2Page';
import PayoffSelectTokenPage from './pages/payoff-select-token-page/PayoffSelectTokenPage';
import PayoffAndFeedbackPage from './pages/payoff-and-feedback-page/PayoffAndFeedbackPage';
import StakeSelectTokenPage from './pages/stake-select-token-page/StakeSelectTokenPage';
import StakeAddPairPage from './pages/stake-add-pair-page/StakeAddPairPage';
import StakeAddLiquidityPage from './pages/stake-add-liquidity-page/StakeAddLiquidityPage';
import FindBuyIOUPage from './pages/find-buy-iou-page/FindBuyIOUPage';
import BuyIOUSelectPage from './pages/buy-iou-select-page/BuyIOUSelectPage';
import BuyIOUPage from './pages/buy-iou-page/BuyIOUPage';
import SelectDesiredIOUSwapPage from './pages/select-desired-iou-swap-page/SelectDesiredIOUSwapPage';
import SwapSelectDesiredTokenPage from './pages/swap-select-desired-token-page/SwapSelectDesiredTokenPage';
import SwapSelectAvailableTokenPage from './pages/swap-select-available-token-page/SwapSelectAvailableTokenPage';
import { ROUTES } from './constants';
import theme from './theme';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './wagmi';
import Loading from './components/loading/Loading'
import CreateIOUProvider from './context/CreateIOUProvider'
import TokensListProvider from './context/TokensListProvider'

import ChainWebContext from './context/chain/ChainWebContext'
import ConnectProviderFailure from './components/main/ConnectProviderFailure'
import { CookiesProvider } from 'react-cookie';



const queryClient = new QueryClient()

function App() {
  const {
    initialization,
    provider,
    hasInitialization,
    isChainConnected,
  } = useContext(ChainWebContext)

  useEffect(() => {
    if (!hasInitialization) {
        initialization()
    } else {
    console.log ( "dApp initialized.....")
    return
  }
  }, [initialization, hasInitialization])

  if (!hasInitialization || !provider) {
    return ( <ConnectProviderFailure /> )
  } else if (hasInitialization) {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Loading>
            <TokensListProvider>
              <CreateIOUProvider>
                <ThemeProvider theme={theme}>
                  <BrowserRouter>
                  <CookiesProvider>
                      <Routes>
                        <Route path={ROUTES.main} element={<HomePage />} />
                        <Route path={ROUTES.mintEditToken} element={<MintEditTokenPage />} />
                        <Route path={ROUTES.editorIOU} element={<EditorIOUPage />} />
                        <Route path={ROUTES.mintSelectToken} element={<MintSelectTokenPage />} />
                        <Route path={ROUTES.mintSelectReceiver} element={<MintSelectReceiverPage />} />
                        <Route path={ROUTES.makeIOUToken1} element={<MakeIOUToken1Page />} />
                        <Route path={ROUTES.makeIOUToken2} element={<MakeIOUToken2Page />} />
                        <Route path={ROUTES.payoffSelectToken} element={<PayoffSelectTokenPage />} />
                        <Route path={ROUTES.payoffAndFeedback} element={<PayoffAndFeedbackPage />} />
                        <Route path={ROUTES.stakeSelectToken} element={<StakeSelectTokenPage />} />
                        <Route path={ROUTES.stakeAddPair} element={<StakeAddPairPage />} />
                        <Route path={ROUTES.stakeAddLiquidity} element={<StakeAddLiquidityPage />} />
                        <Route path={ROUTES.findBuyIOU} element={<FindBuyIOUPage />} />
                        <Route path={ROUTES.buyIOUSelect} element={<BuyIOUSelectPage />} />
                        <Route path={ROUTES.buyIOU + "/:chainId/:tokenAddress"} element={<BuyIOUPage />} />
                        <Route path={ROUTES.selectDesiredIOUSwap} element={<SelectDesiredIOUSwapPage />} />
                        <Route path={ROUTES.swapSelectDesiredToken} element={<SwapSelectDesiredTokenPage />} />
                        <Route path={ROUTES.swapSelectAvailableToken} element={<SwapSelectAvailableTokenPage />} />
                        <Route path="*" element={<Navigate to={ROUTES.main} />} />
                      </Routes>
                    </CookiesProvider>
                  </BrowserRouter>
                </ThemeProvider>
              </CreateIOUProvider>
            </TokensListProvider>
            </Loading>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }
}

export default App;
