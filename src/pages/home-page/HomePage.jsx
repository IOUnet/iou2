import { Box, Grid, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import TokensInfo from '../../components/tokens-info/TokensInfo';
import Button from '../../components/button/Button';
import BrandIconUrl from '../../assets/img/iou.svg';
import { ROUTES } from '../../constants';
import styles from './styles';

//import { tokenInfoData } from '../../storybook-fake-data/storybook-fake-data';

const HomePage = ({ classes }) => {
  const navigate = useNavigate();

  const buttons = [
    { button: 'create & edit iou', handler: () => navigate(ROUTES.mintEditToken) },
    { button: 'search & buy iou', handler: () => navigate(ROUTES.findBuyIOU) },

    { button: 'issue iou', handler: () => navigate(ROUTES.mintSelectToken) },  
    { button: 'payoff iou', handler: () => navigate(ROUTES.payoffSelectToken) },
   
  /* { button: 'stake iou', handler: () => navigate(ROUTES.stakeSelectToken) },  ,
    { button: 'swap iou for iou', handler: () => navigate(ROUTES.selectDesiredIOUSwap) },  */
    //    <TokensInfo data={tokenInfoData} />`
  ];

  return (
    <PageLayout>
      <Box className={classes.top_tagline}>
        <Box component="img" className={classes.brand} src={BrandIconUrl} alt="IOU" />
        <Typography variant="subtitle1">
          Use IOU -<br />and you don't need money anymore
        </Typography>
      </Box>

      <Box className={classes.button_group}>
        <Grid className={classes.button_group_container} container spacing={4}>
          {buttons.map(({ button, handler }) => (
            <Grid key={button} className={classes.button_group_item} item xs={6}>
              <Button onClick={handler}>{button}</Button>
            </Grid>)
          )}
        </Grid>
      </Box>

      <Box className={classes.bottom_tagline}>
        <Typography variant="subtitle1">
          IOU net is a new way from poverty...
        </Typography>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(HomePage);
