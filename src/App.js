import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/home-page/HomePage';
import MintSelectTokenPage from './pages/mint-select-token-page/MintSelectTokenPage';
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route component={HomePage} exact path={ROUTES.main} />
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
          <Redirect to={ROUTES.main} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
