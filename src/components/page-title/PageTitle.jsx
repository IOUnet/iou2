import { Typography, withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles';

const PageTitle = ({ classes, children, ...props }) => {
  return children && (
    <Typography className={classes.root} variant="subtitle1" component="p" {...props}>
      {children}
    </Typography>
  );
};

export default withStyles(styles, { withTheme: true })(PageTitle);
