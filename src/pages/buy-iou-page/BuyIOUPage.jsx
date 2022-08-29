import { Box, Grid, withStyles } from '@material-ui/core';
import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCard from '../../components/token-card/TokenCard';
import ValueInfo from '../../components/value-info/ValueInfo';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { ROUTES } from '../../constants';
import styles from './styles';
import TokensListContext from '../../context/TokensListContext'
import { cardListData } from '../../storybook-fake-data/storybook-fake-data';
const dappStaff = require("../../assets/dappStaff.json")


const BuyIOUPage = ({ classes }) => {
  const history = useHistory();
  const [number, setNumber] = useState(10);
  const tokenList = useContext(TokensListContext)
  const [cardTokenData, setCardTokenData] = useState({})
  const [cookies, setCookie] = useCookies(['currChainId']);

 // const tokenData = tokenList.tokenList[tokenList.currentTokenID];
  const setCurrentTokenData = useCallback(() => {
    if (tokenList.tokenList.length > 0) {
     const tokenData = tokenList.tokenList[tokenList.currentTokenID]
     if (tokenData !== undefined) {
       setCardTokenData(tokenData)
      }
    }
 },[tokenList])
 useEffect(() => {
  setCurrentTokenData()
},[setCurrentTokenData, tokenList])

  const handleBuy = () => {
    window.location.href = dappStaff[cookies.currChainId].exchange + "/#/swap?exactField=input&exactAmount="+number+"&outputCurrency=" + cardTokenData.address;
  };

  if (dappStaff[cookies.currChainId].exchange === "")
  {
    console.log(tokenList)
    return (
      <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Sorry, but no exchange defined for this chain, press back in browser</PageTitle>
      </Box>
      </PageLayout>
    )
  } else {
    return (
      <PageLayout>
        <Box className={classes.pageTitle}>
          <PageTitle>Buy IOUs on Swap</PageTitle>
        </Box>

        <Box className={classes.cardSection}>
          <TokenCard data={cardTokenData} />
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

    {/*      <Grid container spacing={2}>
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
            buy  IOU dollars
          </Button> */}
        </Box>

        <Box className={classes.actionSection}>
          <Button onClick={handleBuy}>
            buy {number} IOUs
          </Button>
        </Box>
      </PageLayout>
    );
  }
};

export default withStyles(styles, { withTheme: true })(BuyIOUPage);
