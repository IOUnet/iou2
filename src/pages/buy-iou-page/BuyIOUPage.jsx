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

const BuyIOUPage = ({ classes }) => {
  const history = useHistory();
  const [number, setNumber] = useState(100);

  const handleBuy = () => {
    history.push(ROUTES.main);
  };

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Buy IOUs on IOUSwap</PageTitle>
      </Box>

      <Box className={classes.cardSection}>
        <TokenCard data={cardListData[0]} />
      </Box>

      <Box className={classes.dataSection}>
        <Grid alignItems="flex-end" container spacing={2}>
          <Grid item xs={7}>
            <Input
              id={'Amount of IOUs to buy'}
              inputProps={{
                inputProps: { min: 0 },
                onChange: (e) => setNumber(e.target.value),
                type: "number",
                value: number,
              }}
              label={'Amount of IOUs to buy'}
            />
          </Grid>
          <Grid item xs={5}>
            <ValueInfo
              className={classes.valueInfo}
              label={'Price in IOUdollars:'}
              value={'1'}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={7}>
            <ValueInfo
              label={'Sum of purchasing:'}
              value={'100'}
            />
          </Grid>
          <Grid item xs={5}>
            <ValueInfo
              label={'You have IOUDollars:'}
              value={'50'}
            />
          </Grid>
        </Grid>

        <Button onClick={handleBuy}>
          buy 50 IOU dollars
        </Button>
      </Box>

      <Box className={classes.actionSection}>
        <Button onClick={handleBuy}>
          buy 100 smbdIOUtoken1
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(BuyIOUPage);
