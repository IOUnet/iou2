import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
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
import { Drizzle } from '@drizzle/store';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import drizzleOptions from './store/DrizzleOptions';
import Loading from './components/loading/Loading'
import CreateIOUProvider from './context/CreateIOUProvider'
import TokensListProvider from './context/TokensListProvider'

import ChainWebContext from './context/chain/ChainWebContext'
import ConnectProviderFailure from './components/main/ConnectProviderFailure'
import { CookiesProvider } from 'react-cookie';



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

    const drizzle = new Drizzle(drizzleOptions)
    const { DrizzleProvider } = drizzleReactHooks;
   
  
  return (
    
      <DrizzleProvider drizzle={drizzle}>
        <Loading>
          <TokensListProvider>
            <CreateIOUProvider>
              <ThemeProvider theme={theme}>
                <BrowserRouter>
                <CookiesProvider>
                    <Switch>
                      <Route component={HomePage} exact path={ROUTES.main} />
                      <Route component={MintEditTokenPage} exact path={ROUTES.mintEditToken} />
                      <Route component={EditorIOUPage} exact path={ROUTES.editorIOU} />
                      <Route component={MintSelectTokenPage} exact path={ROUTES.mintSelectToken} />
                      <Route component={MintSelectReceiverPage} exact path={ROUTES.mintSelectReceiver} />
                      <Route component={MakeIOUToken1Page} exact path={ROUTES.makeIOUToken1} />
                      <Route component={MakeIOUToken2Page} exact path={ROUTES.makeIOUToken2} />
                      <Route component={PayoffSelectTokenPage} exact path={ROUTES.payoffSelectToken} />
                      <Route component={PayoffAndFeedbackPage} exact path={ROUTES.payoffAndFeedback} />
                      <Route component={StakeSelectTokenPage} exact path={ROUTES.stakeSelectToken} />
                      <Route component={StakeAddPairPage} exact path={ROUTES.stakeAddPair} />
                      <Route component={StakeAddLiquidityPage} exact path={ROUTES.stakeAddLiquidity} />
                      <Route component={FindBuyIOUPage} exact path={ROUTES.findBuyIOU} />
                      <Route component={BuyIOUSelectPage} exact path={ROUTES.buyIOUSelect} />
                      <Route component={BuyIOUPage} exact path={ROUTES.buyIOU} />
                      <Route component={SelectDesiredIOUSwapPage} exact path={ROUTES.selectDesiredIOUSwap} />
                      <Route component={SwapSelectDesiredTokenPage} exact path={ROUTES.swapSelectDesiredToken} />
                      <Route component={SwapSelectAvailableTokenPage} exact path={ROUTES.swapSelectAvailableToken} />
                      {/* (!hasInitialization || !provider)&&<ConnectProviderFailure /> */ }
                      { /* (hasInitialization || isChainConnected) && */}<Redirect to={ROUTES.main} />
                    </Switch>
                  </CookiesProvider>
                </BrowserRouter>
              </ThemeProvider>
            </CreateIOUProvider>
          </TokensListProvider>
         </Loading>
      </DrizzleProvider>
  );
  }
}

export default App;
