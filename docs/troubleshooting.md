# Troubleshooting

## App shows “Connect provider failure”

The router is gated behind `isChainConnected` from [`ChainWebContext`](src/context/chain/ChainWebContext.js:3). If the wallet is not connected, [`App()`](src/App.jsx:49) renders [`ConnectProviderFailure`](src/components/main/ConnectProviderFailure.jsx:1).

Fixes:

- Connect a wallet using the UI (MetaMask / injected connector).
- If you rely on WalletConnect, replace the placeholder project id in [`walletConnect()`](src/wagmi.js:9).

## Switching chain fails

Chain switching happens in [`switchChainHandler()`](src/context/chain/ChainWebProvider.jsx:72).

Common causes:

- The target chain isn’t supported by your wallet.
- The chain id in [`dappChains.json`](src/assets/dappChains.json:1) is not present in wagmi’s configured `chains` (see [`chains`](src/wagmi.js:6)).

## “Invalid address format” warnings

[`formatAddress()`](src/api/chain.js:13) uses viem’s `getAddress()` and logs a warning if the address is invalid.

## Contracts return empty lists

If `StoreIOUs` returns empty lists, likely causes are:

- You’re on the wrong chain (check `currChainId` cookie and the selected chain).
- Contract addresses are missing for the current chain id in [`addresses.json`](addresses.json:1).

## Truffle deploy fails because `pk.json` is missing

[`truffle-config.js`](truffle-config.js:28) requires a file one directory **above** the repo root:

- `const pk = require('../pk.json')`

If you don’t have this file, either create it in the expected location or refactor the config to load secrets from environment variables.

