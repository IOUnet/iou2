import { Box, Grid, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCard from '../../components/token-card/TokenCard';
import ValueInfo from '../../components/value-info/ValueInfo';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { ROUTES } from '../../constants';
import styles from './styles';

import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

const StakeAddLiquidityPage = ({ classes }) => {
  const history = useHistory();
  const [number, setNumber] = useState('');
  const [price, setPrice] = useState('');

  const handleRequest = () => {
    console.log('request button clicked');
  };

  const handleBuy = () => {
    console.log('buy button clicked');
  };

  const handleSend = () => {
    history.push(ROUTES.main);
  };

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Send IOUs to IOUSwap</PageTitle>
      </Box>

      <Box className={classes.cardSection}>
        <TokenCard data={cardListData[0]} />
      </Box>

      <Box className={classes.dataSection}>
        <Grid alignItems="flex-end" container spacing={2}>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
            <ValueInfo
              className={classes.valueInfo}
              label={'Sum of deposit in IOUdollars:'}
              value={'100'}
            />
          </Grid>
        </Grid>

        <Grid alignItems="flex-end" container spacing={2}>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
            <ValueInfo
              className={classes.valueInfo}
              label={'You have IOUDollars:'}
              value={'50'}
            />
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.actionSection}>
        <Button onClick={handleRequest}>
          Request loan of 50 IOU dollars
        </Button>
        <Button onClick={handleBuy}>
          buy 50 IOU dollars
        </Button>
        <Button onClick={handleSend}>
          send amounts to swap
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(StakeAddLiquidityPage);
