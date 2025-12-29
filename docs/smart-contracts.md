# Smart Contracts

This repo contains Solidity contracts plus Truffle migrations that deploy them.

## Contract inventory

### `MakeIOU`

Factory contract that creates a new IOU token instance.

- Source: [`contract MakeIOU`](contracts/MakeIOU.sol:11)
- Creates new instances via OpenZeppelin clone pattern: [`Clones.clone(proxy)`](contracts/MakeIOU.sol:64)
- Calls `setIOU()` on the new clone: [`newIOU.setIOU(...)`](contracts/MakeIOU.sol:66)

Conceptually:

- `MakeIOU` holds:
  - `store` (registry)
  - `proxy` (a clone template used to create IOU token instances)

Those are configured post-deploy in [`setStore()`](contracts/MakeIOU.sol:22) and [`setimplement()`](contracts/MakeIOU.sol:27).

### `IOUtoken`

The IOU token logic: an ERC20-like token with additional state:

- Issuance history (`allIOUs`)
- Feedback history (`allFeedbacks`)
- Mutable description fields (geo, phone, description, keywords)

Key functions:

- Initialization: [`initialize()`](contracts/IOUtoken.sol:87)
- One-time configuration: [`setIOU()`](contracts/IOUtoken.sol:92)
- Issue IOUs: [`mint()`](contracts/IOUtoken.sol:129)
- Pay back + feedback: [`burn()`](contracts/IOUtoken.sol:144)

The token registers itself and its holders in `StoreIOUs`:

- `setIOU()` calls [`store.addIOU1(...)`](contracts/IOUtoken.sol:113)
- `mint()` calls [`store.addHolder(...)`](contracts/IOUtoken.sol:140)
- `transfer()` calls [`store.addHolder(...)`](contracts/IOUtoken.sol:162)

### `StoreIOUs`

Registry/index that stores:

- All IOU token addresses
- IOUs by issuer
- IOUs by social profile
- IOUs by keyword
- IOUs by geo (city/street)

Key functions:

- Register a new IOU token: [`addIOU1()`](contracts/StoreIOUs.sol:48)
- Query lists:
  - [`getIOUList()`](contracts/StoreIOUs.sol:162)
  - [`getIOUListKey()`](contracts/StoreIOUs.sol:170)
  - [`getIOUsbyCity()`](contracts/StoreIOUs.sol:194)
  - [`getIOUsbyStreet()`](contracts/StoreIOUs.sol:201)

It also stores the current IOU implementation address used by proxies/clones:

- Setter: [`setimplIOU()`](contracts/StoreIOUs.sol:38)
- Getter: [`implIOU()`](contracts/StoreIOUs.sol:208)

### `ProxyIOU`

This contract acts as a cloneable “proxy wrapper” that delegates calls to the current IOU implementation stored in `StoreIOUs`.

- Source: [`contract ProxyIOU`](contracts/ProxyIOU.sol:8)

On `setIOU(...)`, it:

1. Reads the implementation address via [`store1.implIOU()`](contracts/ProxyIOU.sol:17)
2. Delegatecalls `initialize()` on the implementation (see [`delegatecall(abi.encodeWithSignature("initialize()"))`](contracts/ProxyIOU.sol:18))
3. Delegatecalls `setIOU(...)` on the implementation (see the long signature in [`encodeWithSignature`](contracts/ProxyIOU.sol:53))

It also provides a view helper for the frontend:

- [`getIOU(address)`](contracts/ProxyIOU.sol:146) returns name/symbol/description in one call.

## Deployment (Truffle migrations)

Truffle configuration lives in [`truffle-config.js`](truffle-config.js:1).

Artifacts are written to the frontend directory via:

- [`contracts_build_directory: "./src/artifacts"`](truffle-config.js:40)

### Migration order

1. Deploy migrations registry: [`1_initial_migration.js`](migrations/1_initial_migration.js:1)
2. Deploy `MakeIOU`: [`2_deploy_make.js`](migrations/2_deploy_make.js:1)
3. Deploy `IOUtoken` implementation and call `initialize()`: [`3_deploy_IOU.js`](migrations/3_deploy_IOU.js:9)
4. Deploy `ProxyIOU` (clone template): [`4_deploy_ProxyIOU.js`](migrations/4_deploy_ProxyIOU.js:3)
5. Deploy `StoreIOUs` as an upgradeable proxy (OpenZeppelin): [`deployProxy(StoreIOUs, ...)`](migrations/5_deploy_storeiou.js:16)
6. Wire addresses:
   - Store points to implementation: [`setimplIOU(iIOU.address)`](migrations/6_settings.js:14)
   - Factory points to store + proxy template:
     - [`makeiouInstance.setStore(...)`](migrations/6_settings.js:17)
     - [`makeiouInstance.setimplement(...)`](migrations/6_settings.js:18)

## Address book (`addresses.json`)

The frontend uses a static address map in [`addresses.json`](addresses.json:1). Each top-level key is a decimal chain id, for example:

- `56` (BSC mainnet)
- `80001` (Polygon Mumbai)
- `999` (Wanchain testnet / custom)

The helper functions in [`src/constants.js`](src/constants.js:23) select addresses based on the `currChainId` cookie.

