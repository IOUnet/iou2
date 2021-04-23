import { Box, Card, CardContent, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles';

const TokenCard = ({ classes, data, isFullMode = true, ...props }) => {
  const {
    title, count, description, keys, address, minted, payed, rating, units,
  } = data;

  return (
    <Card className={classes.root} {...props}>
      <CardContent className={classes.content}>
        <Typography className={classes.title} variant="subtitle1">
          {title}
          {count && ` (I have: ${count})`}
        </Typography>
        <Box className={classes.token_data}>
          <Box className={classes.description}>
            <Typography>{description && `Description: ${description}`}</Typography>
            <Typography>{keys && `Keys: ${keys}`}</Typography>
            <Typography>{address && `Address: ${address}`}</Typography>
          </Box>
          {isFullMode && (
            <Box className={classes.data}>
              <Typography>{minted && `Minted: ${minted}`}</Typography>
              <Typography>{payed && `Payed: ${payed}`}</Typography>
              <Typography>{rating && `Rating: ${rating}%`}</Typography>
              <Typography>{units && `Units: ${units}`}</Typography>
            </Box>)
          }
        </Box>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(TokenCard);
