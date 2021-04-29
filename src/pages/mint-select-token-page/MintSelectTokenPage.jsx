import { Box, withStyles } from '@material-ui/core';
import React from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import Button from '../../components/button/Button';
import styles from './styles';

import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

const MintSelectTokenPage = ({ classes }) => {
  return (
    <PageLayout>
      <Box className={classes.selectSection}>
        <PageTitle>Give your IOU or</PageTitle>
        <Button onClick={() => console.log('button clicked')}>
          make new IOU
        </Button>
      </Box>

      <Box className={classes.listSection}>
        <TokenCardsList
          data={cardListData.slice(0, 3)}
          onClick={() => console.log('card clicked')}
          title={'Select IOU:'}
        />
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(MintSelectTokenPage);
