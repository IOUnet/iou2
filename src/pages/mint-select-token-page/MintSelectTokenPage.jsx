import { Box, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import Button from '../../components/button/Button';
import styles from './styles';

import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

const MintSelectTokenPage = ({ classes }) => {
  const handleButtonClick = () => console.log('button clicked');
  const handleCardClick = () => console.log('card clicked');

  return (
    <PageLayout>
      <Box className={classes.selectSection}>
        <Typography className={classes.text} variant="subtitle1">
          Give your IOU or
        </Typography>
        <Button onClick={handleButtonClick}>make new IOU</Button>
      </Box>
      <Box className={classes.listSection}>
        <TokenCardsList
          data={cardListData.slice(0, 3)}
          onClick={handleCardClick}
          title={'Select IOU:'}
        />
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(MintSelectTokenPage);
