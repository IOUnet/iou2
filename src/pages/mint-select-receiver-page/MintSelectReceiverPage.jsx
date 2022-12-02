import { Box, CardHeader, SvgIcon, Typography, withStyles } from '@material-ui/core';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHistory,  Redirect, useParams  } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCard from '../../components/token-card/TokenCard';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { ReactComponent as QRIcon } from '../../assets/img/QRico.svg';
import { ROUTES } from '../../constants';
import styles from './styles';
import TokensListContext from '../../context/TokensListContext'
import useSendIOU from '../../hooks/useSendIOU'
import { drizzleReactHooks } from '@drizzle/react-plugin';
import * as a from '../../api/chain';
import { switchChain } from '../../api/chain';
const dappStaff = require("../../assets/dappStaff.json")
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const MintSelectReceiverPage = ({ classes }) => {
  const history = useHistory();
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [comment, setComment] = useState('')
  const [cookies, setCookie] = useCookies(['currChainId']);

  const [cardTokenData, setCardTokenData] = useState({

  })
  const tokenList = useContext(TokensListContext)
  const [approve, sendIOU] = useSendIOU()
  const { drizzle } = useDrizzle();
  const params = useParams();

  const setCurrentTokenData = useCallback(() => {
     if (tokenList.tokenList.length > 0) {
      const tokenData = tokenList.tokenList[tokenList.currentTokenID]
      setCardTokenData(tokenData)
     }
  },[tokenList])


  useEffect(() => {

    (async () => {
      const chainId = await drizzle.web3.eth.net.getId();
      const hexChainId = drizzle.web3.utils.toHex(chainId);

      if (hexChainId != params.chainId) {
        const { ethereum, web3 } = await a.detectEthereumProvider()
        await a.switchChain(ethereum, params.chainId)
        setCookie('currChainId', params.chainId, { path: '/' });
        window.location.reload();
      }
    })()

  }, [])

  useEffect(() => {
    setCurrentTokenData()
  },[setCurrentTokenData, tokenList])

  const handleSend = () => {
    
    sendIOU({
      address:address,
      amount:number,
      comment:comment,
      tokenAddress:cardTokenData.address
    })
    //sendIOU({address:address})
   // history.push(ROUTES.main);
  };
  
 /*  const handleQR = () => {
    console.log('QR button clicked');
  };
        <Button onClick={handleQR}>
          <SvgIcon className={classes.qr_ico} component={QRIcon} viewBox="0 0 124 92" />
        </Button>
 */
  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Give your IOU:</PageTitle>
      </Box>

      <Box className={classes.cardSection}>
        <TokenCard data={cardTokenData} />
      </Box>
      
      

      <Box className={classes.QRSection}>
        <CardHeader
          className={classes.QRSection_text}
          subheader="(paste address of receiver or scan their QR code)"
          title="To..."
        />

      </Box>

      <Box className={classes.dataSection}>
        <Input
          id={'EthereumAddress0x...'}
          inputProps={{
            onChange: (e) => setAddress(e.target.value),
            value: address,
          }}
          label={'Ethereum address 0x...'}
        />
        
        <Box className={classes.numberInput}>
          <Input
            id={'NumberOfGivenIOUs'}
            inputProps={{
              inputProps: { min: 0 },
              onChange: (e) => setNumber(e.target.value),
              type: "number",
              value: number,
            }}
            label={'Number of given IOUs'}
          />          
          <Typography>Units: hours</Typography>
        </Box>
        <Box className={classes.dataSection}>
        <Input
          id={'Comments...'}
          inputProps={{
            onChange: (e) => setComment(e.target.value),
            value: comment,
          }}
          label={'Why you give this IOU...'}
        />
      </Box>
      </Box>

      <Box className={classes.actionSection}>
        <Button onClick={handleSend}>
          send IOU
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(MintSelectReceiverPage);
