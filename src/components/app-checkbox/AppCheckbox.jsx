import { Checkbox, FormGroup, FormControlLabel, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './styles';

const AppCheckbox = ({ classes, ...props }) => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormGroup row className={classes.root}>
      <FormControlLabel
        className={classes.label}
        control={
          <Checkbox
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

export default withStyles(styles, { withTheme: true })(AppCheckbox);
