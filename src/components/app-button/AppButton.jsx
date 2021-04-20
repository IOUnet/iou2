import { Button, withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles';

const AppButton = ({ classes, label, ...props }) => {
  return (
    <Button
      className={classes.root}
      {...props}
    >
      {label}
    </Button>
  );
};

export default withStyles(styles, { withTheme: true })(AppButton);
