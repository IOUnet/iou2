import {
  Checkbox as MUICheckbox,
  FormGroup,
  FormControlLabel,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import styles from './styles';

const Checkbox = ({ classes, className, checked, onChange, ...props }) => {
  return (
    <FormGroup row className={clsx(classes.root, className)}>
      <FormControlLabel
        className={classes.label}
        control={
          <MUICheckbox
            checked={checked}
            className={classes.checkbox}
            color="primary"
            onChange={onChange}
            />
          }
        {...props}
      />
    </FormGroup>
  );
};

export default withStyles(styles, { withTheme: true })(Checkbox);
