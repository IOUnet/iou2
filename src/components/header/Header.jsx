import {
  AppBar,
  IconButton,
  Link,
  Toolbar,
  Typography,
  withStyles,
  dropDown,
  Button,
} from '@material-ui/core';

import {Dehaze} from "@material-ui/icons";

/* import clsx from 'clsx';
import StarIcon from '@material-ui/icons/Star';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ShareIcon from '@material-ui/icons/Share';
import CloseIcon from '@material-ui/icons/Close'; */
import React, {useState, forwardRef, useContext, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import styles from './styles';

import { Box } from '@material-ui/core';
import useGetIOUs from '../../hooks/useGetIOUstat'
import useGetIssuers from '../../hooks/useGetIssuersStat'
import useGetIOUKeys from '../../hooks/useGetIOUKeys'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useCookies } from 'react-cookie';
import * as a from '../../api/chain';

import FavoriteIcon from "@material-ui/icons/Favorite";
import MenuIcon from "@material-ui/icons/Menu";


const LinkBehavior = forwardRef((props, ref) => (
  <RouterLink ref={ref} to={ROUTES.main} {...props} />
));

const Header = ({ classes, setMenuVisibility }) => {
  const [isNotifications, setIsNotifications] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const dataIOUsList = useGetIOUs()
  const dataIssuers = useGetIssuers()
  const dataIOUKeys = useGetIOUKeys()
  const dappChains = require("../../assets/dappChains.json")
  const [cookies, setCookie] = useCookies(['currChainId']);
  // const [chainId] =useContext(ChainWebContext)
  const dappStaff = require("../../assets/dappStaff.json")

  async function onSelect (e){

    const { ethereum, web3 } = await a.detectEthereumProvider()
    await a.switchChain(ethereum, e.value)
    setCookie('currChainId', e.value, { path: '/' });
    window.location.reload();

  }
  var tokens,keywords, issuers;

  if (dappChains[cookies.currChainId] === undefined) {
    return (
      <Typography component="h1" className={classes.title} style={{color:"red"}}>
        Chain {cookies.currChainId} in not configured.
      </Typography>
    )
  }

  if (dataIOUsList != undefined) {
   tokens = dataIOUsList;

  }
   if (dataIOUKeys != undefined) {
    keywords = dataIOUKeys.length;

   }

   if (dataIssuers != undefined) {
    issuers = dataIssuers;

   }
   var options=[];
   for (const i  in dappChains){
      // value = dappChains[i].chainId;
      // label = dappChains[i].chainName;
      options.push({
        value: dappChains[i].chainId,
        label: dappChains[i].chainName
      })
   }



  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
      <Typography>
        <MenuIcon fontSize="large" onClick={setMenuVisibility} style={{cursor: "pointer"}} />
      </Typography>
      <Link component={LinkBehavior}  className={classes.mainLink}>
          <Typography component="h1" className={classes.title}>
              IOU Talimtoken dApp home
          </Typography>
        </Link>
        <Link href = "https://docs.google.com/document/d/e/2PACX-1vQcv_ZTJD6-54AMjLLCXQv1LtMSOtLdBzhGXo0aAIDkGljgivZABIMQbJyIOF0c6r1W9w8cNY4ATUoE/pub"  className={classes.mainLink} target = "_blank">
          <Typography component="h1" className={classes.title}>
              HOW TO MAKE IOU Talimtoken
          </Typography>
        </Link>
        <Dropdown options={options} onChange={onSelect} placeholder={dappChains[cookies.currChainId].chainName}  />
        {(dappStaff[cookies.currChainId].faucet !== "")&&
        <Link  href ={dappStaff[cookies.currChainId].faucet} target = "_blank">
          <Typography component="h2" className={classes.title} style={{color:"yellow"}}>
               &gt;&gt; Click here to get  {dappChains[cookies.currChainId].nativeCurrency.symbol} tokens for testing! &lt;&lt; <br /> -== This works on {dappChains[cookies.currChainId].chainName} ==-
          </Typography>
        </Link>}
        <Typography className={classes.text}>
        {`IOUs issued:  ${tokens}`}
        {`, with ${keywords} keywords`}
        {`, issuers in system:  ${issuers}`}
      </Typography>

      </Toolbar>
    </AppBar>
  );
};

/**
 *  <IconButton
          aria-label="close"
          className={classes.button}
          onClick={() => console.log('close button clicked')}
        >
          <CloseIcon />
        </IconButton>

   

        <IconButton
          aria-label="share"
          className={classes.button}
          onClick={() => console.log('share button clicked')}
        >
          <ShareIcon />
        </IconButton>

        <IconButton
          aria-label="favorite"
          className={clsx(classes.button, isFavorite && classes.button_active)}
          onClick={() => setIsFavorite((s) => !s)}
        >
          <StarIcon/>
        </IconButton>

        <IconButton
          aria-label="notification"
          className={clsx(classes.button, isNotifications && classes.button_active)}
          onClick={() => setIsNotifications((s) => !s)}
        >
          <NotificationsIcon/>
        </IconButton>
 */
export default withStyles(styles, { withTheme: true })(Header);
