import { Button as MUIButton, withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles';

const Button = ({ classes, label, ...props }) => {
  return (
    <MUIButton
      className={classes.root}
      color="primary"
      variant="contained"
      {...props}
    >
      {label}
    </MUIButton>
  );
};

export default withStyles(styles, { withTheme: true })(Button);
