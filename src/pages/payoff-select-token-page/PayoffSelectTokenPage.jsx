import { Box, withStyles } from '@material-ui/core';
import React from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import styles from './styles';

// ------------------------------------------------------------
const fakeData = [
  {
    id: 'id1',
    title: 'SmbdIOUtoken1',
    count: 3,
    description: 'consulting in blockchain',
    keys: 'blockchain, consulting',
    address: '0x12345678ABCDF123456',
    minted: 10,
    payed: 7,
    rating: 80,
    units: 'hours',
  },
  {
    id: 'id2',
    title: 'SmbdIOUtoken2',
    count: 1,
    description: 'consulting in blockchain',
    keys: 'blockchain, consulting',
    address: '0x12345678ABCDF123456',
    minted: 15,
    payed: 8,
    rating: 60,
    units: 'hours',
  },
  {
    id: 'id3',
    title: 'SmbdIOUtoken3',
    count: 2,
    description: 'consulting in blockchain',
    keys: 'blockchain, consulting',
    address: '0x12345678ABCDF123456',
    minted: 15,
    payed: 8,
    rating: 60,
    units: 'hours',
  },
];
// ------------------------------------------------------------

const PayoffSelectTokenPage = ({ classes }) => {
  const handleCardClick = () => console.log('card clicked');

  return (
    <PageLayout>
      <Box className={classes.listSection}>
        <TokenCardsList
          data={fakeData}
          title={'Select IOU to payoff:'}
          onClick={handleCardClick}
        />
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(PayoffSelectTokenPage);
