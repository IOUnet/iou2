import { Box, Grid, SvgIcon, Typography, withStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import React from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import TokensInfo from '../../components/tokens-info/TokensInfo';
import Button from '../../components/button/Button';
import { ReactComponent as BrandIcon } from '../../assets/img/iou.svg';
import { ROUTES } from '../../constants';
import styles from './styles';

//import { tokenInfoData } from '../../storybook-fake-data/storybook-fake-data';

const HomePage = ({ classes }) => {
  const history = useHistory();

  const buttons = [
    { button: 'make & edit iou', handler: () => history.push(ROUTES.mintEditToken) },
    { button: 'give iou', handler: () => history.push(ROUTES.mintSelectToken) },
    
    { button: 'payoff iou', handler: () => history.push(ROUTES.payoffSelectToken) },
    { button: 'find & buy iou', handler: () => history.push(ROUTES.findBuyIOU) },
   
  /* { button: 'stake iou', handler: () => history.push(ROUTES.stakeSelectToken) },  ,
    { button: 'swap iou for iou', handler: () => history.push(ROUTES.selectDesiredIOUSwap) },  */
    //    <TokensInfo data={tokenInfoData} />`
  ];

  return (
    <PageLayout>
      <Box className={classes.top_tagline}>
        <SvgIcon className={classes.brand} component={BrandIcon} viewBox="0 0 95 80" />
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
