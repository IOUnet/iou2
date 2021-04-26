import { Box, CardHeader, SvgIcon, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import TokenCard from '../../components/token-card/TokenCard';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { ReactComponent as QRIcon } from '../../assets/img/QRico.svg';
import styles from './styles';

import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

const MintSelectReceiverPage = ({ classes }) => {
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  return (
    <PageLayout>
      <Box className={classes.selectSection}>
        <Typography className={classes.title} variant="subtitle1">
          Give your IOU:
        </Typography>
        <TokenCard data={cardListData[0]} />
      </Box>

      <Box className={classes.QRSection}>
        <CardHeader
          className={classes.QRSection_text}
          subheader="(paste address of receiver or scan their QR code)"
          title="To..."
        />
        <Button onClick={() => console.log('button clicked')}>
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
        <Button onClick={() => console.log('button clicked')}>
          send IOU
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(MintSelectReceiverPage);
