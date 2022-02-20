import { Box, Card, CardContent, Typography, withStyles } from '@material-ui/core';
import React, {Link} from 'react';
import styles from './styles';

const TokenCard = ({ classes, data, isFullMode = true, ...props }) => {
  const {
    title, symbol, count, description, issuerName, socialProfile, issuerAddr, keys, address, minted, payed, rating, units, location, phone, portfolio
  } = data;
/* <Link to= {socialProfile} activeClassName="active" > {socialProfile}</Link> */
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
            <Typography>{issuerName && `Issuer's Name: ${issuerName}`}</Typography>
            <Typography to = {socialProfile} >
             {socialProfile && `Social Profile: ${socialProfile}`} </Typography>
            
            <Typography to = {issuerAddr} title = {portfolio}> {issuerAddr}</Typography>
            <Typography>{keys && `Keys: ${keys}`}</Typography>
            <Typography>{address && `Address: ${address}`}</Typography>
            <Typography>{location && `Location: ${location}`}</Typography>
            <Typography>{phone && `Phone: ${phone}`}</Typography>
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
