# IOUverse Documentation

This folder contains developer-focused documentation for **IOUverse** (a React/Vite dApp + Solidity contracts).

## Quick links

- Start here: [`Getting Started`](getting-started.md)
- Frontend overview: [`Frontend (React/Vite)`](frontend.md)
- Smart contracts overview: [`Smart Contracts`](smart-contracts.md)
- Frontend ↔ contract calls: [`Hooks & Contract Calls`](hooks.md)
- Deploying the web app: [`Deployment`](deployment.md)
- Common issues: [`Troubleshooting`](troubleshooting.md)
- Working on the repo: [`Contributing`](contributing.md)
- Security notes: [`Security`](security.md)

## What this repo contains

### Frontend

- Vite app entry: [`index.html`](index.html:1)
- React bootstrap + providers: [`main()`](src/index.jsx:20)
- Router + pages: [`App()`](src/App.jsx:30)

Key libraries:

- **React 19** for UI (see dependencies in [`package.json`](package.json:1))
- **Vite** for dev/build tooling (see scripts in [`package.json`](package.json:35))
- **wagmi + viem** for EVM wallet/network/contract interactions (see [`config`](src/wagmi.js:5))
- **MUI** for UI components and theming (see theme providers in [`main()`](src/index.jsx:30))

### Smart contracts

Truffle-based Solidity contracts live under [`contracts/`](contracts/.gitkeep). Artifacts are configured to build into the frontend under [`contracts_build_directory`](truffle-config.js:40):

- Contract sources: [`contracts/`](contracts/.gitkeep)
- Deploy/migrations: [`migrations/`](migrations/1_initial_migration.js:1)
- Built ABIs for frontend: [`src/artifacts/`](src/artifacts/MakeIOU.json:1)

The dApp uses a small address-book mapping in [`addresses.json`](addresses.json:1), accessed through helpers like [`getStoreIOUsAddress()`](src/constants.js:51).

## High-level architecture

At a high level:

1. The frontend connects a wallet (wagmi) and selects a chain.
2. It reads/writes contract state using hooks in [`src/hooks/`](src/hooks/index.js:1).
3. Contract deployments write ABIs to [`src/artifacts/`](src/artifacts/MakeIOU.json:1) and addresses to [`addresses.json`](addresses.json:1).

For details, see [`Smart Contracts`](smart-contracts.md) and [`Hooks & Contract Calls`](hooks.md).
