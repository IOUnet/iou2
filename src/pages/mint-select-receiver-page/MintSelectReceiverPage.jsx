import { Box, CardHeader, SvgIcon, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCard from '../../components/token-card/TokenCard';
import Button from '../../components/button/Button';
import { TransactionProgress, TransactionReview } from '../../components/tx'
import Input from '../../components/input/Input';
import { ROUTES } from '../../constants';
import styles from './styles';
import TokensListContext from '../../context/TokensListContext'
import useSendIOU from '../../hooks/useSendIOU'

const MintSelectReceiverPage = ({ classes }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [comment, setComment] = useState('')
  const [cardTokenData, setCardTokenData] = useState({

  })
  const tokenList = useContext(TokensListContext)
  const {
    stage,
    reviewParams,
    beginReview,
    confirmSend,
    cancelReview,
    progress
  } = useSendIOU()

  const setCurrentTokenData = useCallback(() => {
     if (tokenList.tokenList.length > 0) {
      const tokenData = tokenList.tokenList[tokenList.currentTokenID]
      setCardTokenData(tokenData)
     }
  },[tokenList])

  useEffect(() => {
    setCurrentTokenData()
  },[setCurrentTokenData, tokenList])

  const handleSend = () => {
    try {
      beginReview({
        address: address,
        amount: number,
        comment: comment,
        tokenAddress: cardTokenData.address,
        chainLabel: 'Polygon'
      })
    } catch (error) {
      console.error('Unable to start review:', error)
    }
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

      {stage === 'review' && (
        <TransactionReview
          title="Review transaction"
          summaryItems={[
            { label: 'To', value: address || '—' },
            { label: 'Amount', value: number ? `${number} IOU` : '—' },
            { label: 'Token', value: cardTokenData?.symbol || cardTokenData?.name || 'IOU' }
          ]}
          chainLabel={reviewParams?.chainLabel || 'Polygon'}
          feeHint="Network fees apply"
          onConfirm={confirmSend}
          onCancel={cancelReview}
        />
      )}

      {(stage === 'submitting' || stage === 'result') && (
        <TransactionProgress
          status={progress.status}
          txHash={progress.txHash}
          chainLabel={progress.chainLabel}
          errorMessage={progress.errorMessage}
        />
      )}
    </PageLayout>
  );
};

const MintSelectReceiverPageWithStyles = withStyles(styles, { withTheme: true })(MintSelectReceiverPage)

export default MintSelectReceiverPageWithStyles;
