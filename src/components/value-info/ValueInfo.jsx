import { Box, Typography, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import styles from './styles';

const ValueInfo = ({ classes, className, value, label, ...props }) => {
  return (
    <Box className={clsx(classes.root, className)} {...props}>
      <Typography className={classes.label} component="p">{label}</Typography>
      <Typography className={classes.value} component="p">{value}</Typography>
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(ValueInfo);
