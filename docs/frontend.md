# Frontend (React/Vite)

## Entry points

- HTML shell: [`index.html`](index.html:1)
- React bootstrapping: [`main()`](src/index.jsx:20)
- App router: [`App()`](src/App.jsx:30)

The `main()` function wraps the application in several providers:

- [`WagmiProvider`](src/index.jsx:31) using [`config`](src/wagmi.js:5)
- [`QueryClientProvider`](src/index.jsx:32) for React Query
- MUI theme providers: [`MuiThemeProvider`](src/index.jsx:33) + [`StylesThemeProvider`](src/index.jsx:34)
- Cookies: [`CookiesProvider`](src/index.jsx:35)
- Chain/wallet facade: [`ChainWebProvider`](src/index.jsx:36)

## Routing

Routes are defined in [`App()`](src/App.jsx:30) and path constants live in [`ROUTES`](src/constants.js:1).

Key routes include:

- Home: [`ROUTES.main`](src/constants.js:2)
- Create an IOU token (wizard-style):
  - [`ROUTES.makeIOUToken1`](src/constants.js:7)
  - [`ROUTES.makeIOUToken2`](src/constants.js:8)
- Find/buy IOUs:
  - [`ROUTES.findBuyIOU`](src/constants.js:14)
  - [`ROUTES.buyIOU`](src/constants.js:16)
- Read-only dashboard (no wallet required): [`ReadOnlyDashboard`](src/pages/dashboard/ReadOnlyDashboard.jsx:1) is rendered on `/` when no injected provider is present and is always reachable at `/discover`.

## Wallet/chain handling

The repo uses wagmi for wallet and chain management:

- Global wagmi config: [`config`](src/wagmi.js:5)
- Chain context facade: [`ChainWebProvider`](src/context/chain/ChainWebProvider.jsx:13)

`ChainWebProvider` wraps wagmi hooks such as:

- [`useAccount`](src/context/chain/ChainWebProvider.jsx:27)
- [`useConnect`](src/context/chain/ChainWebProvider.jsx:28)
- [`useSwitchChain`](src/context/chain/ChainWebProvider.jsx:30)

It also:

- Persists the selected chain id in a cookie (`currChainId`) when switching chains (see [`switchChainHandler()`](src/context/chain/ChainWebProvider.jsx:72)).
- Exposes `connectWallet`, `switchChain`, and `addAssetToMetamask` via [`ChainWebContext`](src/context/chain/ChainWebContext.js:3).

### Supported chains

The wagmi config currently includes:

- `mainnet`, `polygon`, `sepolia`, `polygonMumbai` (see [`chains`](src/wagmi.js:6))

The UI chain selector uses a chain list in [`dappChains.json`](src/assets/dappChains.json:1).

## Application state

This repo uses small React Context providers for cross-page state:

- Token list + selection: [`TokensListProvider`](src/context/TokensListProvider.jsx:5)
- IOU creation form state: [`CreateIOUProvider`](src/context/CreateIOUProvider.jsx:5)
- In-app notifications: [`NotificationProvider`](src/context/notification/NotificationProvider.jsx:6)

## Contract interactions

Most reads/writes are implemented as hooks in [`src/hooks/`](src/hooks/index.js:1) and helpers in [`src/helpers/`](src/helpers/index.js:1).

See [`Hooks & Contract Calls`](hooks.md).
