import { Box, withStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import Button from '../../components/button/Button';
import { ROUTES } from '../../constants';
import styles from './styles';

import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

const MintSelectTokenPage = ({ classes }) => {
  const history = useHistory();

  const handleMakeNewIOU = () => {
    history.push(ROUTES.makeIOUToken1);
  };

  const handleSelectIOU = (_, id) => {
    console.log('cardId ---', id);
    history.push(ROUTES.mintSelectReceiver);
  };

  return (
    <PageLayout>
      <Box className={classes.selectSection}>
        <PageTitle>Give your IOU or</PageTitle>
        <Button onClick={handleMakeNewIOU}>
          make new IOU
        </Button>
      </Box>

      <Box className={classes.listSection}>
        <TokenCardsList
          data={cardListData.slice(0, 3)}
          onClick={handleSelectIOU}
          title={'Select IOU:'}
        />
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(MintSelectTokenPage);
