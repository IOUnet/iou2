import { Box, withStyles } from '@material-ui/core';
import React from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import styles from './styles';

import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

const PayoffSelectTokenPage = ({ classes }) => {
  const handleCardClick = () => console.log('card clicked');

  return (
    <PageLayout>
      <Box className={classes.listSection}>
        <TokenCardsList
          data={cardListData.slice(0, 3)}
          onClick={handleCardClick}
          title={'Select IOU to payoff:'}
        />
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(PayoffSelectTokenPage);
