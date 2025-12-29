# Deployment

This document covers deploying the **frontend** (static web app). Smart-contract deployment is covered in [`Smart Contracts`](smart-contracts.md).

## Build the frontend

```bash
npm run build
```

Vite outputs static files (typically into `dist/`).

## SPA routing (Apache)

The repo includes an Apache rewrite file for “single-page app” routing:

- [`./.htaccess`](.htaccess:1)

It rewrites unknown paths back to `index.html`, which allows deep links like `/buy-iou/...` to load.

Note: The file header says “COPY .htaccess TO ./build folder!” in [`./.htaccess`](.htaccess:1). With Vite, you’ll likely copy it into `dist/` instead of `build/`.

## Configure production analytics and WalletConnect

- Google Tag Manager is initialized in [`main()`](src/index.jsx:20).
- WalletConnect project id is configured in [`walletConnect()`](src/wagmi.js:9).

Make sure these values are correct before shipping.
