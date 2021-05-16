import { Box, CardHeader, SvgIcon, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCard from '../../components/token-card/TokenCard';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { ReactComponent as QRIcon } from '../../assets/img/QRico.svg';
import { ROUTES } from '../../constants';
import styles from './styles';

import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

const MintSelectReceiverPage = ({ classes }) => {
  const history = useHistory();
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  const handleSend = () => {
    history.push(ROUTES.main);
  };

  const handleQR = () => {
    console.log('QR button clicked');
  };

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Give your IOU:</PageTitle>
      </Box>

      <Box className={classes.cardSection}>
        <TokenCard data={cardListData[0]} />
      </Box>

      <Box className={classes.QRSection}>
        <CardHeader
          className={classes.QRSection_text}
          subheader="(paste address of receiver or scan their QR code)"
          title="To..."
        />
        <Button onClick={handleQR}>
          <SvgIcon className={classes.qr_ico} component={QRIcon} viewBox="0 0 124 92" />
        </Button>
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
