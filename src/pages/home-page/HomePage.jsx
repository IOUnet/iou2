import { Box, Grid, SvgIcon, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import TokensInfo from '../../components/tokens-info/TokensInfo';
import Button from '../../components/button/Button';
import { ReactComponent as BrandIcon } from '../../assets/img/iou.svg';
import styles from './styles';

// ------------------------------------------------------------
const fakeData = { tokens: 7, issuers: 5, keywords: 11 };
// ------------------------------------------------------------

const HomePage = ({ classes }) => {
  const handleButtonClick = () => console.log('button clicked');

  const buttons = [
    { button: 'give iou', handler: handleButtonClick },
    { button: 'payoff iou', handler: handleButtonClick },
    { button: 'stake iou', handler: handleButtonClick },
    { button: 'buy iou', handler: handleButtonClick },
    { button: 'swap iou for iou', handler: handleButtonClick },
  ];

  return (
    <PageLayout>
      <Box className={classes.top_tagline}>
        <SvgIcon className={classes.brand} component={BrandIcon} viewBox="0 0 95 80" />
        <Typography variant="subtitle1">
          Use IOU -<br />and you don't need money anymore
        </Typography>
      </Box>

      <TokensInfo data={fakeData} />

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
