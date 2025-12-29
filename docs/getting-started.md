# Getting Started

This guide helps you run the IOUverse dApp locally and understand the minimum configuration needed.

## Prerequisites

- **Node.js + npm** (recommended: a recent LTS). The repo uses Vite and React; see scripts in [`package.json`](package.json:35).
- An EVM wallet:
  - **MetaMask** (for the “injected” connector)
  - Optional: WalletConnect (requires a project id; see [`walletConnect()`](src/wagmi.js:9))
- For smart-contract work: **Truffle** + a local chain (Ganache/Anvil).

## Install

From the repo root:

```bash
npm ci
```

If you don’t have a lockfile-compatible environment, use:

```bash
npm install
```

## Run the frontend

Start the Vite dev server:

```bash
npm run dev
```

The dev server is configured for port **3000** in [`defineConfig()`](vite.config.js:5).

## Build + preview

```bash
npm run build
npm run preview
```

## Tests

The repo exposes a `test` script that runs **Vitest** (`"test": "vitest"` in [`package.json`](package.json:39)).

```bash
npm run test
```

If the command fails with “vitest: not found”, add Vitest as a dev dependency.

## Chain selection and address resolution

The dApp resolves contract addresses per chain using [`addresses.json`](addresses.json:1).

- The current chain id is resolved from a cookie named `currChainId` (see [`getCurrentChainId()`](src/constants.js:33)).
- Helpers return chain-specific contract addresses:
  - [`getStoreIOUsAddress()`](src/constants.js:51)
  - [`getProxyIOUAddress()`](src/constants.js:55)
  - [`getMakeIOUAddress()`](src/constants.js:59)

## Required configuration (important)

### WalletConnect project id

The WalletConnect connector in [`config`](src/wagmi.js:5) uses a placeholder:

- [`walletConnect({ projectId: 'your-project-id' })`](src/wagmi.js:9)

Replace this with a real WalletConnect Cloud project id.

### Google Tag Manager

The app initializes GTM in [`main()`](src/index.jsx:20) using:

- `gtmId: 'G-7D7W89BF1C'` in [`tagManagerArgs`](src/index.jsx:21)

If you don’t want tracking in local dev, remove/guard this call.

## Smart-contract development (optional)

This repo includes Truffle configuration in [`truffle-config.js`](truffle-config.js:1). Contract build output is set to [`contracts_build_directory`](truffle-config.js:40) so the frontend can import ABIs from [`src/artifacts/`](src/artifacts/MakeIOU.json:1).

See [`Smart Contracts`](smart-contracts.md) for deployment details.
