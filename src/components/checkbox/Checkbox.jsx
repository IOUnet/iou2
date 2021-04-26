import { Checkbox as MUICheckbox, FormControlLabel, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import styles from './styles';

const Checkbox = ({ classes, className, labelFullWidth, ...props }) => {
  return (
    <FormControlLabel
      classes={{
        root: clsx(classes.root, className),
        label: clsx(labelFullWidth && classes.label),
        labelPlacementStart: classes.labelPlacementStart,
      }}
      control={
        <MUICheckbox
          className={classes.checkbox}
          color="primary"
        />
      }
      {...props}
    />
  );
};

export default withStyles(styles, { withTheme: true })(Checkbox);
