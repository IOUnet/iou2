import {
  FormHelperText,
  FormControl,
  InputLabel,
  Input as MUIInput,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import styles from './styles';

const Input = ({ classes, className, inputProps, ...props }) => {
  return (
    <FormControl className={clsx(classes.root, className)} {...props}>
      <InputLabel
        className={classes.label}
        htmlFor={props.id}
        variant="outlined"
      >
        {props.label}
      </InputLabel>

      <MUIInput
        className={classes.input}
        id={props.id}
        {...inputProps}
      />

      <FormHelperText id={props.id}>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

export default withStyles(styles, { withTheme: true })(Input);
