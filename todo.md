# UX Refactor — Functional Requirements + Implementation TODO

## Metadata

- Project: IOUverse (React/Vite dApp + EVM smart contracts)
- Document: UX Refactor Requirements + TODO
- Version: 0.1.0
- Date: 2025-12-29
- Source refs:
  - App routing + wallet gating: [`App()`](src/App.jsx:30)
  - Chain/wallet facade: [`ChainWebProvider`](src/context/chain/ChainWebProvider.jsx:13)
  - Current hard wallet gating: [`Loading`](src/components/loading/Loading.jsx:1)
  - Chain switching uses browser confirm: [`switchChainHandler()`](src/context/chain/ChainWebProvider.jsx:72)
  - Wagmi configuration: [`config`](src/wagmi.js:5)
  - Address book: [`addresses.json`](addresses.json:1)

## Scope decision (confirmed)

- Target V1 scope: **Full app** (IOU + Swap/DeFi + DAO) with consistent transaction UX patterns.
- Read-only scope: **Partial** — allow read-only browsing only for **IOU discovery** and **IOU detail**; other tabs may remain wallet-required.

## Problem statement (current UX issues)

1. Whole app is effectively blocked without a wallet due to:
   - `isChainConnected` gating in [`App()`](src/App.jsx:30)
   - address-based gating in [`Loading`](src/components/loading/Loading.jsx:1)
2. Chain switching uses blocking browser dialogs (confirm/alert), not an in-app guided flow in [`switchChainHandler()`](src/context/chain/ChainWebProvider.jsx:72).
3. No unified transaction UX patterns: users do not consistently see a human-readable summary before wallet prompts.
4. Error handling is inconsistent; copy is partially present in [`translations.json`](src/assets/translations.json:1) but not normalized.
5. WalletConnect config has a placeholder project id in [`walletConnect()`](src/wagmi.js:9).

---

## Functional Requirements (TRD-style)

### REQ-UX-001 — Partial read-only browsing for IOU Discovery and IOU Detail

**Text (EARS):**
- When the user is not connected, the system shall allow navigation to IOU discovery and IOU detail pages in read-only mode.

**Acceptance criteria (Gherkin):**
- Given the user is not connected
  When the user opens the app
  Then the user can access IOU discovery and IOU detail screens without being blocked by a wallet-required screen

- Given the user is not connected
  When the user taps a write action CTA (create, send, payoff, swap, defi, vote)
  Then the system shows a connect-to-continue sheet instead of failing silently

**Verification:** test

**Implementation notes:**
- Refactor gating in [`App()`](src/App.jsx:30) and [`Loading`](src/components/loading/Loading.jsx:1).

---

### REQ-UX-002 — Connect-to-continue gating pattern for write actions

**Text (EARS):**
- When a write action is initiated while the user is not connected, the system shall present a connect-to-continue sheet explaining why connection is required.

**Acceptance criteria (Gherkin):**
- Given the user is not connected
  When the user taps Create IOU
  Then the system shows a connect sheet with a primary Connect CTA and a secondary Cancel CTA

**Verification:** test

**Implementation notes:**
- Use [`connectWallet()`](src/context/chain/ChainWebProvider.jsx:54) (or improved connector selection) and keep state stable.

---

### REQ-UX-003 — In-app chain selector with persistent chain badge

**Text (EARS):**
- The system shall display the current chain (name) and gas token symbol in a persistent chain badge on primary screens.
- Where multiple chains are supported, the system shall provide an in-app chain selector UI.

**Acceptance criteria (Gherkin):**
- Given the user is connected
  When the user views any write-action screen
  Then the current chain and gas token symbol are visible

**Verification:** inspection + test

**Implementation notes:**
- Replace window confirm flow in [`switchChainHandler()`](src/context/chain/ChainWebProvider.jsx:72) with an in-app bottom sheet.
- Keep cookie behavior consistent with [`getCurrentChainId()`](src/constants.js:33).

---

### REQ-UX-004 — Wrong-network and missing-deployment preflight

**Text (EARS):**
- When the user initiates a write action, the system shall perform a preflight check to detect:
  - wrong network
  - missing contract addresses for the selected chain
  - feature not available on the selected chain

**Acceptance criteria (Gherkin):**
- Given the user is connected
  When the selected chain does not have required addresses in [`addresses.json`](addresses.json:1)
  Then the primary CTA is disabled and the system recommends a supported chain

**Verification:** test

---

### REQ-UX-005 — Human-readable transaction review before wallet prompt

**Text (EARS):**
- Before requesting any wallet signature or transaction, the system shall present a human-readable transaction review summary.

**Acceptance criteria (Gherkin):**
- Given the user is connected
  When the user taps Confirm on any write flow
  Then the system shows a review screen with action summary, chain context, and estimated fee (when possible)

**Verification:** test

---

### REQ-UX-006 — Standard transaction progress and recovery states

**Text (EARS):**
- After submitting a transaction, the system shall show a progress state (waiting for wallet, submitted, confirmed, failed) and provide recovery actions.

**Acceptance criteria (Gherkin):**
- Given the user submitted a transaction
  When the transaction is pending
  Then the system shows a pending indicator and a link to view details

- Given the user rejects the wallet prompt
  When the wallet returns a rejection
  Then the system returns to a stable screen and offers Try again and Cancel

**Verification:** test

---

### REQ-UX-007 — Unified error taxonomy and microcopy

**Text (EARS):**
- The system shall map wallet, network, and contract errors into a small set of user-facing categories with actionable next steps.

**Acceptance criteria (Gherkin):**
- Given an error occurs
  When the system displays an error
  Then the message uses beginner-friendly wording and includes a single recommended next step

**Verification:** inspection + test

---

### REQ-UX-008 — Address input safety

**Text (EARS):**
- When the user enters a recipient address, the system shall validate the checksum format and require confirmation before sending.

**Acceptance criteria (Gherkin):**
- Given the user enters an invalid address
  When the user attempts to continue
  Then the system blocks progression and shows an inline validation message

**Verification:** test

---

### REQ-UX-009 — WalletConnect configuration hygiene

**Text (EARS):**
- The system shall load WalletConnect configuration from environment/runtime configuration and shall not ship placeholder identifiers.

**Acceptance criteria (Gherkin):**
- Given WalletConnect is enabled
  When the app starts
  Then the WalletConnect project id is configured and not equal to the placeholder in [`walletConnect()`](src/wagmi.js:9)

**Verification:** inspection

---

## Non-Functional Requirements (ISO 25010 aligned)

- NFR-UX-001 Usability: a novice can complete create/send/payoff flows with ≤ 1 moderator hint in usability testing.
- NFR-UX-002 Accessibility: touch targets ≥ 44px; key screens usable with dynamic text sizing.
- NFR-UX-003 Reliability: wrong-network recovery should succeed for ≥ 80% of users in tests.
- NFR-UX-004 Performance: main navigation and IOU discovery interactions feel responsive on mid-tier mobile devices.

---

## Implementation TODO (WBS)

- [ ] TASK-UX-001 Refactor routing/gating to enable IOU discovery + IOU detail in read-only mode (REQ-UX-001)
- [ ] TASK-UX-002 Modify [`Loading`](src/components/loading/Loading.jsx:1) to not block read-only IOU routes (REQ-UX-001)
- [ ] TASK-UX-003 Implement connect-to-continue sheet component and wire to all write CTAs (REQ-UX-002)
- [ ] TASK-UX-004 Replace browser confirm/alert chain switch in [`switchChainHandler()`](src/context/chain/ChainWebProvider.jsx:72) with in-app modal sheet (REQ-UX-003)
- [ ] TASK-UX-005 Add persistent chain badge UI and chain selector sheet (REQ-UX-003)
- [ ] TASK-UX-006 Implement preflight checks using chain + addresses map in [`addresses.json`](addresses.json:1) (REQ-UX-004)
- [ ] TASK-UX-007 Build transaction review component and integrate into create/mint/burn flows first (REQ-UX-005)
- [ ] TASK-UX-008 Add transaction progress UI and standardized error handling hooks (REQ-UX-006, REQ-UX-007)
- [ ] TASK-UX-009 Create error mapper utility and update [`translations.json`](src/assets/translations.json:1) keys as needed (REQ-UX-007)
- [ ] TASK-UX-010 Add address validation + confirmation step in send flow (REQ-UX-008)
- [ ] TASK-UX-011 Externalize WalletConnect project id config and update [`config`](src/wagmi.js:5) accordingly (REQ-UX-009)
- [ ] TASK-UX-012 Run a novice usability test (6 tasks) and iterate on top 5 findings (NFR-UX-001, NFR-UX-003)

