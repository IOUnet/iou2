# Contributing

## Repository layout

- Frontend code: [`src/`](src/App.jsx:1)
- Contracts: [`contracts/`](contracts/MakeIOU.sol:1)
- Deploy scripts: [`migrations/`](migrations/2_deploy_make.js:1)
- Static contract address map: [`addresses.json`](addresses.json:1)

## Development workflow

1. Install dependencies

   ```bash
   npm ci
   ```

2. Run the frontend

   ```bash
   npm run dev
   ```

3. Keep contracts and frontend in sync

Truffle is configured to write ABIs into the frontend directory (see [`contracts_build_directory`](truffle-config.js:40)). When you change Solidity contracts, recompile/deploy and ensure the generated artifacts in [`src/artifacts/`](src/artifacts/MakeIOU.json:1) match.

## Storybook (UI components)

The repo contains Storybook configuration:

- [`./.storybook/main.js`](.storybook/main.js:1)
- [`./.storybook/preview.js`](.storybook/preview.js:1)

The configuration references addons like `@storybook/addon-essentials` (see [`addons`](.storybook/main.js:6)). If Storybook fails to start due to missing packages, add the necessary Storybook dependencies and scripts.

## Coding conventions

- Prefer wagmi hooks over legacy APIs. [`src/api/chain.js`](src/api/chain.js:1) is deprecated.
- Keep chain ids consistent:
  - `wagmi` chains: [`chains`](src/wagmi.js:6)
  - UI chain metadata: [`dappChains.json`](src/assets/dappChains.json:1)
  - Deployed addresses: [`addresses.json`](addresses.json:1)

