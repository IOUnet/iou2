import { Avatar, Box, Grid, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import Button from '../../components/button/Button';
import brand from '../../assets/img/iou.png';
import styles from './styles';

// ------------------------------------------------------------
const fakeData = [
  {
    id: 'id1',
    title: 'SmbdIOUtoken1',
    count: 1,
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
  // {
  //   id: 'id3',
  //   title: 'SmbdIOUtoken3',
  //   count: 1,
  //   description: 'consulting in blockchain',
  //   keys: 'blockchain, consulting',
  //   address: '0x12345678ABCDF123456',
  //   minted: 15,
  //   payed: 8,
  //   rating: 60,
  //   units: 'hours',
  // },
];
// ------------------------------------------------------------

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
      <TokenCardsList title={'Select IOU:'} data={fakeData} onClick={handleCardClick} />
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(MintSelectTokenPage);
