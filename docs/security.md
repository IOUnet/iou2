# Security

This document lists security and operational concerns discovered in the current repository state.

## Private keys and RPC credentials (high risk)

### Hard-coded private keys

[`truffle-config.js`](truffle-config.js:1) includes hard-coded private keys in several network configs (example: [`mumbai.privateKeys`](truffle-config.js:82)).

Action items:

- Remove private keys from source control.
- Load secrets from environment variables or a local, gitignored secrets file.

### External secrets loaded from outside the repo

[`truffle-config.js`](truffle-config.js:28) loads `../pk.json`, which is outside the repo root.

Action items:

- Document and standardize secret management.
- Prefer `.env` + runtime configuration or a consistent `secrets.example.json` pattern.

## WalletConnect project id

The WalletConnect connector uses a placeholder in [`walletConnect()`](src/wagmi.js:9). If you ship this as-is, WalletConnect sessions may not work.

## On-chain data is public and permanent

The protocol stores user-supplied strings on-chain as part of the IOU description (see fields in [`DescriptionIOU`](contracts/interfaces/iIOUtoken.sol:13)).

Implications:

- Avoid storing sensitive personal information.
- Treat `phone`, `socialProfile`, and `description` as public.

## Validation and limits

Some input validation exists but is commented out (see the `require` block in [`setIOU()`](contracts/IOUtoken.sol:103)).

Action items:

- Consider enforcing strict length limits and input normalization in production deployments.

