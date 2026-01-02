import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react'
import { useAccount } from 'wagmi'

import HomePage from './pages/home-page/HomePage';
import MintSelectTokenPage from './pages/mint-select-token-page/MintSelectTokenPage';
import MintEditTokenPage from './pages/mint-edit-token-page/MintEditTokenPage';
import EditorIOUPage from './pages/editor-iou-page/EditorIOU';
import MintSelectReceiverPage from './pages/mint-select-receiver-page/MintSelectReceiverPage';
import MakeIOUToken1Page from './pages/make-iou-token1-page/MakeIOUToken1Page';
import MakeIOUToken2Page from './pages/make-iou-token2-page/MakeIOUToken2Page';
import ReadOnlyDashboard from './pages/dashboard/ReadOnlyDashboard';
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
import Loading from './components/loading/Loading'
import CreateIOUProvider from './context/CreateIOUProvider'
import TokensListProvider from './context/TokensListProvider'

import ChainWebContext from './context/chain/ChainWebContext'
import ConnectProviderFailure from './components/main/ConnectProviderFailure'
import Button from './components/button/Button'

const RequireWalletRoute = ({ children, hasProvider }) => {
  const { connectWallet } = useContext(ChainWebContext)
  const { address, isConnected, isConnecting } = useAccount()
  const navigate = useNavigate()

  if (!hasProvider) {
    return <ConnectProviderFailure />
  }

  if (isConnecting) {
    return 'Connecting Wallet...'
  }

  if (!isConnected || !address) {
    return (
      <div style={{ maxWidth: 520, margin: '6rem auto', textAlign: 'center', padding: '1.5rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Wallet required</h2>
        <p style={{ marginBottom: '1.5rem' }}>Connect your wallet to access this section.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button onClick={connectWallet}>Connect wallet</Button>
          <Button onClick={() => navigate(ROUTES.findBuyIOU)}>Browse IOUs</Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

function App() {
  const {
    initialization,
    hasInitialization,
  } = useContext(ChainWebContext)

  const { address, isConnected } = useAccount()

  const hasProvider = typeof window !== 'undefined' && !!window.ethereum

  useEffect(() => {
    if (!hasInitialization) {
        initialization()
    } else {
    console.log ( "dApp initialized.....")
    return
  }
  }, [initialization, hasInitialization])

  // Always provide the MUI theme; otherwise components using `withStyles` will
  // crash when we show the <ConnectProviderFailure /> screen.
  return (
    <Loading>
      <TokensListProvider>
        <CreateIOUProvider>
          <BrowserRouter>
            <Routes>
              <Route path={ROUTES.findBuyIOU} element={<FindBuyIOUPage />} />
              <Route path={ROUTES.buyIOU + "/:chainId/:tokenAddress"} element={<BuyIOUPage />} />

              <Route
                path={ROUTES.main}
                element={
                  isConnected
                    ? <RequireWalletRoute hasProvider={hasProvider}><HomePage /></RequireWalletRoute>
                    : <ReadOnlyDashboard />
                }
              />
              <Route path="/discover" element={<ReadOnlyDashboard />} />
              <Route path={ROUTES.mintEditToken} element={<RequireWalletRoute hasProvider={hasProvider}><MintEditTokenPage /></RequireWalletRoute>} />
              <Route path={ROUTES.editorIOU} element={<RequireWalletRoute hasProvider={hasProvider}><EditorIOUPage /></RequireWalletRoute>} />
              <Route path={ROUTES.mintSelectToken} element={<RequireWalletRoute hasProvider={hasProvider}><MintSelectTokenPage /></RequireWalletRoute>} />
              <Route path={ROUTES.mintSelectReceiver} element={<RequireWalletRoute hasProvider={hasProvider}><MintSelectReceiverPage /></RequireWalletRoute>} />
              <Route path={ROUTES.makeIOUToken1} element={<RequireWalletRoute hasProvider={hasProvider}><MakeIOUToken1Page /></RequireWalletRoute>} />
              <Route path={ROUTES.makeIOUToken2} element={<RequireWalletRoute hasProvider={hasProvider}><MakeIOUToken2Page /></RequireWalletRoute>} />
              <Route path={ROUTES.payoffSelectToken} element={<RequireWalletRoute hasProvider={hasProvider}><PayoffSelectTokenPage /></RequireWalletRoute>} />
              <Route path={ROUTES.payoffAndFeedback} element={<RequireWalletRoute hasProvider={hasProvider}><PayoffAndFeedbackPage /></RequireWalletRoute>} />
              <Route path={ROUTES.stakeSelectToken} element={<RequireWalletRoute hasProvider={hasProvider}><StakeSelectTokenPage /></RequireWalletRoute>} />
              <Route path={ROUTES.stakeAddPair} element={<RequireWalletRoute hasProvider={hasProvider}><StakeAddPairPage /></RequireWalletRoute>} />
              <Route path={ROUTES.stakeAddLiquidity} element={<RequireWalletRoute hasProvider={hasProvider}><StakeAddLiquidityPage /></RequireWalletRoute>} />
              <Route path={ROUTES.buyIOUSelect} element={<RequireWalletRoute hasProvider={hasProvider}><BuyIOUSelectPage /></RequireWalletRoute>} />
              <Route path={ROUTES.selectDesiredIOUSwap} element={<RequireWalletRoute hasProvider={hasProvider}><SelectDesiredIOUSwapPage /></RequireWalletRoute>} />
              <Route path={ROUTES.swapSelectDesiredToken} element={<RequireWalletRoute hasProvider={hasProvider}><SwapSelectDesiredTokenPage /></RequireWalletRoute>} />
              <Route path={ROUTES.swapSelectAvailableToken} element={<RequireWalletRoute hasProvider={hasProvider}><SwapSelectAvailableTokenPage /></RequireWalletRoute>} />
              <Route path="*" element={<Navigate to={ROUTES.findBuyIOU} />} />
            </Routes>
          </BrowserRouter>
        </CreateIOUProvider>
      </TokensListProvider>
    </Loading>
  )
}

export default App;
