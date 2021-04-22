import { Button as MUIButton, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import styles from './styles';

const Button = ({ classes, className, children, ...props }) => {
  return (
    <MUIButton
      className={clsx(classes.root, className)}
      color="primary"
      variant="contained"
      {...props}
    >
      {children}
    </MUIButton>
  );
};

export default withStyles(styles, { withTheme: true })(Button);
