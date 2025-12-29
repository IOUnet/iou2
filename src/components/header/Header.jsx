import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import React, { forwardRef, useContext, useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { mainnet, polygon } from 'wagmi/chains'
import MenuIcon from '@mui/icons-material/Menu'

import { ROUTES } from '../../constants'
import styles from './styles'
import useGetIOUs from '../../hooks/useGetIOUstat'
import useGetIssuers from '../../hooks/useGetIssuersStat'
import useGetIOUKeys from '../../hooks/useGetIOUKeys'
import ChainWebContext from '../../context/chain/ChainWebContext'
import { useCookies } from 'react-cookie'

const LinkBehavior = forwardRef((props, ref) => (
  <RouterLink ref={ref} to={ROUTES.main} {...props} />
))

const chainOptions = [mainnet, polygon].map((chain) => ({
  id: chain.id,
  hexId: `0x${chain.id.toString(16)}`,
  name: chain.name,
  symbol: chain.nativeCurrency?.symbol,
}))

const shortenAddress = (addr) => {
  if (!addr) return ''
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

const Header = ({ classes, setMenuVisibility }) => {
  const dataIOUsList = useGetIOUs()
  const dataIssuers = useGetIssuers()
  const dataIOUKeys = useGetIOUKeys()

  const [cookies, setCookie] = useCookies(['currChainId'])
  const {
    account,
    connectWallet,
    resetProvider,
    chainId,
    switchChain,
    isChainConnected,
  } = useContext(ChainWebContext)

  const [walletMenuOpen, setWalletMenuOpen] = useState(false)
  const [chainSheetOpen, setChainSheetOpen] = useState(false)
  const [selectedChainHex, setSelectedChainHex] = useState(null)
  const [copyState, setCopyState] = useState('')

  const effectiveHexChainId = useMemo(() => {
    if (chainId) return `0x${Number(chainId).toString(16)}`
    if (cookies.currChainId) return cookies.currChainId
    return chainOptions[1]?.hexId // default to Polygon
  }, [chainId, cookies.currChainId])

  const currentChain = useMemo(
    () => chainOptions.find((c) => c.hexId.toLowerCase() === effectiveHexChainId?.toLowerCase()) || chainOptions[0],
    [effectiveHexChainId]
  )

  const tokens = dataIOUsList || 0
  const keywords = dataIOUKeys?.length || 0
  const issuers = dataIssuers || 0

  const handleCopy = async () => {
    if (!account) return
    await navigator.clipboard.writeText(account)
    setCopyState('copied')
    setTimeout(() => setCopyState(''), 1500)
  }

  const openChainSheet = () => {
    setSelectedChainHex(currentChain?.hexId)
    setChainSheetOpen(true)
    setWalletMenuOpen(false)
  }

  const confirmChainSwitch = async () => {
    if (!selectedChainHex) return
    await switchChain(selectedChainHex)
    setCookie('currChainId', selectedChainHex, { path: '/' })
    setChainSheetOpen(false)
  }

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
        <Typography>
          <MenuIcon fontSize="large" onClick={setMenuVisibility} style={{ cursor: 'pointer' }} />
        </Typography>
        <Link component={LinkBehavior} className={classes.mainLink}>
          <Typography component="h1" className={classes.title}>
            IOU dApp home
          </Typography>
        </Link>
        <Link
          href="https://docs.google.com/document/d/e/2PACX-1vQcv_ZTJD6-54AMjLLCXQv1LtMSOtLdBzhGXo0aAIDkGljgivZABIMQbJyIOF0c6r1W9w8cNY4ATUoE/pub"
          className={classes.mainLink}
          target="_blank"
        >
          <Typography component="h1" className={classes.title}>
            HOW TO IOU
          </Typography>
        </Link>

        <Box className={classes.flexSpacer} />

        <Box className={classes.badgeRow}>
          <Button
            variant="outlined"
            size="small"
            className={classes.chainBadge}
            onClick={openChainSheet}
          >
            {currentChain?.name} · {currentChain?.symbol}
          </Button>

          <Box className={classes.walletPill} onClick={() => setWalletMenuOpen((s) => !s)}>
            <Typography className={classes.walletText}>
              {isChainConnected && account ? shortenAddress(account) : 'Connect wallet'}
            </Typography>
            <Typography className={classes.walletSub}>
              {currentChain?.name} {currentChain?.symbol && `· ${currentChain.symbol}`}
            </Typography>
          </Box>

          {walletMenuOpen && (
            <Box className={classes.walletMenu}>
              {!isChainConnected && (
                <Button fullWidth size="small" onClick={connectWallet} className={classes.menuButton}>
                  Connect
                </Button>
              )}
              {isChainConnected && (
                <Button fullWidth size="small" onClick={resetProvider} className={classes.menuButton}>
                  Disconnect
                </Button>
              )}
              <Button fullWidth size="small" onClick={openChainSheet} className={classes.menuButton}>
                Switch chain
              </Button>
              {isChainConnected && (
                <Button fullWidth size="small" onClick={handleCopy} className={classes.menuButton}>
                  {copyState === 'copied' ? 'Copied' : 'Copy address'}
                </Button>
              )}
            </Box>
          )}
        </Box>

        <Typography className={classes.text}>
          {`IOUs issued:  ${tokens}`}
          {`, with ${keywords} keywords`}
          {`, issuers in system:  ${issuers}`}
        </Typography>
      </Toolbar>

      {chainSheetOpen && (
        <Box className={classes.sheetOverlay}>
          <Box className={classes.sheetCard}>
            <Typography variant="h6" gutterBottom>
              Switch chain
            </Typography>
            <Box className={classes.chainList}>
              {chainOptions.map((opt) => (
                <label key={opt.id} className={classes.chainRow}>
                  <input
                    type="radio"
                    name="chain-option"
                    value={opt.hexId}
                    checked={selectedChainHex === opt.hexId}
                    onChange={(e) => setSelectedChainHex(e.target.value)}
                  />
                  <span>
                    {opt.name} ({opt.symbol})
                  </span>
                </label>
              ))}
            </Box>
            <Box className={classes.sheetActions}>
              <Button variant="contained" onClick={confirmChainSwitch} disabled={!selectedChainHex}>
                Confirm
              </Button>
              <Button variant="text" onClick={() => setChainSheetOpen(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </AppBar>
  )
}

export default withStyles(styles, { withTheme: true })(Header)
