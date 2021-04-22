import { Box, Card, CardContent, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles';

const TokenCardsList = ({ classes, data, onClick }) => {
  return (
    <Card className={classes.root}>
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(TokenCardsList);
