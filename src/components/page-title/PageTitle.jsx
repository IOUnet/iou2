import { Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import styles from './styles';

const PageTitle = ({ classes, className, children, ...props }) => {
  return children && (
    <Typography
      className={clsx(classes.root, className)}
      variant="subtitle1" component="p"
      {...props}
    >
      {children}
    </Typography>
  );
};

export default withStyles(styles, { withTheme: true })(PageTitle);
