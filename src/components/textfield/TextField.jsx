import { TextField as MUITextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import styles from './styles';

const TextField = ({ classes, className, ...props }) => {
  return (
    <MUITextField
      className={clsx(classes.root, className)}
      variant="outlined"
      autoComplete="off"
      {...props}
    />
  );
};

export default withStyles(styles, { withTheme: true })(TextField);
