import { Box } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import Button from '../../components/button/Button';
import { ROUTES } from '../../constants';
import styles from './styles';

import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

const SwapSelectAvailableTokenPage = ({ classes }) => {
  const navigate = useNavigate();

  const handleSelectIOU = (_, id) => {
    console.log('cardId ---', id);
  };

  const handleSwap = () => {
    navigate(ROUTES.main);
  };

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Select yours available IOU:</PageTitle>
      </Box>

      <Box className={classes.listSection}>
        <TokenCardsList
          data={cardListData.slice(0, 2)}
          onClick={handleSelectIOU}
        />
      </Box>

      <Box className={classes.actionSection}>
        <Button onClick={handleSwap}>
          swap iou
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(SwapSelectAvailableTokenPage);
