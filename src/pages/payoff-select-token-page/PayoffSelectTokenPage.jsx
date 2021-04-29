import { Box, withStyles } from '@material-ui/core';
import React from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import styles from './styles';

import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

const PayoffSelectTokenPage = ({ classes }) => {
  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Select IOU to payoff:</PageTitle>
      </Box>

      <Box className={classes.listSection}>
        <TokenCardsList
          data={cardListData.slice(0, 3)}
          onClick={() => console.log('card clicked')}
        />
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(PayoffSelectTokenPage);
