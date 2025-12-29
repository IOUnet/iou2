# Hooks & Contract Calls

This document explains how the frontend reads/writes contract state.

## Address discovery

Contract addresses are loaded from [`addresses.json`](addresses.json:1) using helpers in [`src/constants.js`](src/constants.js:1).

Notable helpers:

- [`getStoreIOUsAddress()`](src/constants.js:51)
- [`getProxyIOUAddress()`](src/constants.js:55)
- [`getMakeIOUAddress()`](src/constants.js:59)

The current chain id is resolved by [`getCurrentChainId()`](src/constants.js:33), which prefers the `currChainId` cookie.

## Read patterns

The codebase uses two main read styles:

1. **Reactive reads** with wagmi hooks (recommended):
   - Example: [`useReadContract`](src/hooks/useGetIOUs.js:24) to fetch `StoreIOUs.getIOUList(account)`.
2. **Imperative reads** with `wagmi/actions` (useful in loops):
   - Example: [`readContract()`](src/hooks/useGetIOUs.js:45) to fetch IOU metadata for each address.

## Write patterns

Writes use wagmi’s [`useWriteContract`](src/hooks/useCreateIOU.js:2) and confirmation uses [`useWaitForTransactionReceipt`](src/hooks/useCreateIOU.js:2).

## Hook reference

### Create a new IOU token

- Hook: [`useCreateIOU()`](src/hooks/useCreateIOU.js:38)
- Contract call: `MakeIOU.makeIOU(...)` (ABI defined in [`MAKE_IOU_ABI`](src/hooks/useCreateIOU.js:7))
- Address: from [`getMakeIOUAddress()`](src/hooks/useCreateIOU.js:4)

Notes:

- Keywords, unit, phone are converted to `bytes32` using [`stringToHex()`](src/hooks/useCreateIOU.js:3).

### List IOUs owned by the connected account

- Hook: [`useGetIOUs()`](src/hooks/useGetIOUs.js:15)
- Step 1: Read list of IOU token addresses from `StoreIOUs.getIOUList(account)` (see [`functionName: 'getIOUList'`](src/hooks/useGetIOUs.js:27)).
- Step 2: For each IOU address, read aggregated metadata via `ProxyIOU.getIOU(iouAddress)` (see [`functionName: 'getIOU'`](src/hooks/useGetIOUs.js:48)).

### Find IOUs (by keyword, city, street)

- Hook: [`useFindIOU()`](src/hooks/useFindIOU.jsx:86)

Search behavior:

- By keyword: `StoreIOUs.getIOUListKey(bytes32 keyword)` (see [`getIOUListKey`](src/hooks/useFindIOU.jsx:37))
- By city: `StoreIOUs.getIOUsbyCity(...)` (see [`getIOUsbyCity`](src/hooks/useFindIOU.jsx:26))
- By street: `StoreIOUs.getIOUsbyStreet(...)` (see [`getIOUsbyStreet`](src/hooks/useFindIOU.jsx:12))

After fetching addresses, the hook reads metadata from `ProxyIOU.getIOU(iouAddress)` and then loads:

- Feedbacks via [`getFeedbacks()`](src/helpers/getFeedbacks.jsx:33)
- Holder balances via [`getAllIOUs()`](src/helpers/getAllIOUs.jsx:30)

### Mint IOU tokens (issue an IOU to someone)

- Hook: [`useSendIOU()`](src/hooks/useSendIOU.js:22)
- Contract call: `IOUtoken.mint(to, amount, comment)` (see [`functionName: 'mint'`](src/hooks/useSendIOU.js:67))

### Burn IOU tokens (pay back + leave feedback)

- Hook: [`usePayoffIOU()`](src/hooks/usePayoffIOU.js:22)
- Contract call: `IOUtoken.burn(amount, rate, feedback)` (see [`functionName: 'burn'`](src/hooks/usePayoffIOU.js:66))

## Legacy chain API

[`src/api/chain.js`](src/api/chain.js:1) is explicitly marked as “deprecated” and mostly returns placeholders. New functionality should use wagmi hooks directly.

