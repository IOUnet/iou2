import { Box, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCard from '../../components/token-card/TokenCard';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import styles from './styles';

import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

const StakeAddLiquidityPage = ({ classes }) => {
  const [number, setNumber] = useState('');
  const [price, setPrice] = useState('');

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Send IOUs to IOUSwap</PageTitle>
      </Box>

      <Box className={classes.selectSection}>
        <TokenCard data={cardListData[0]} />
      </Box>

      <Box className={classes.dataSection}>
        <Box display="flex" alignItems="flex-end" className={classes.dataRow}>
          <Input
            id={'Amount of IOUs to send'}
            inputProps={{
              inputProps: { min: 0 },
              onChange: (e) => setNumber(e.target.value),
              type: "number",
              value: number,
            }}
            label={'Amount of IOUs to send'}
          />
          <Typography className={classes.dataRow_text} component="p">
            Sum of deposit in IOUdollars:
          </Typography>
          <Typography className={classes.dataRow_digit} component="p">
            100
          </Typography>
        </Box>

        <Box display="flex" alignItems="flex-end" className={classes.dataRow}>
          <Input
            id={'Your price 1 IOU in IOUdollars'}
            inputProps={{
              inputProps: { min: 0 },
              onChange: (e) => setPrice(e.target.value),
              type: "number",
              value: price,
            }}
            label={'Your price 1 IOU in IOUdollars'}
          />
          <Typography className={classes.dataRow_text} component="p">
            You have IOUDollars:
          </Typography>
          <Typography className={classes.dataRow_digit} component="p">
            50
          </Typography>
        </Box>
      </Box>

      <Box className={classes.actionSection}>
        <Button onClick={() => console.log('button clicked')}>
          Request loan of 50 IOU dollars
        </Button>
        <Button onClick={() => console.log('button clicked')}>
          buy 50 IOU dollars
        </Button>
        <Button onClick={() => console.log('button clicked')}>
          send amounts to swap
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(StakeAddLiquidityPage);
