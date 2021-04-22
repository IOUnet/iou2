import { Box, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles';

const TokensInfo = ({ classes, data: { tokens, issuers, keywords } }) => {
  return (
    <Box className={classes.root} >
      <Typography className={classes.text} variant="subtitle1">
        {`IOUs already: ${tokens}`}
        {(issuers || issuers === 0) && `, from ${issuers}issuers`}
        {(keywords || keywords === 0) && `, with ${keywords}keywords`}
      </Typography>
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(TokensInfo);