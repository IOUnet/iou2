import {
  Checkbox as MUICheckbox,
  FormGroup,
  FormControlLabel,
  withStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import styles from './styles';

const Checkbox = ({ classes, ...props }) => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormGroup row className={classes.root}>
      <FormControlLabel
        className={classes.label}
        control={
          <MUICheckbox
            checked={checked}
            className={classes.checkbox}
            color="primary"
            onChange={handleChange}
            />
          }
        {...props}
      />
    </FormGroup>
  );
};

export default withStyles(styles, { withTheme: true })(Checkbox);
