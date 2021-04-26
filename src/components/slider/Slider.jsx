import { Box, Grid, Slider as MUISlider, Typography, withStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from 'clsx';
import React from 'react';
import styles from './styles';

const Slider = ({ classes, className, title, ...props }) => {
  // const [value, setValue] = useState(50);
  // const handleChange = (_, newValue) => setValue(newValue);

  return (
    <Box className={clsx(classes.root, className)}>
      {title && (
        <Typography className={classes.title} color="primary" variant="caption" component="p">
          {title}
        </Typography>
      )}

      <Grid container spacing={2}>
        <Grid item>
          <FavoriteIcon className={clsx(classes.icon, classes.icon_left)} />
        </Grid>
        <Grid item xs>
          <MUISlider
            className={classes.slider}
            classes={{
              thumb: classes.slider_thumb,
              rail: classes.slider_rail,
              valueLabel: classes.slider_valueLabel,
            }}
            // value={value}
            // onChange={handleChange}
            valueLabelDisplay="on"
            {...props}
          />
        </Grid>
        <Grid item>
          <FavoriteIcon className={clsx(classes.icon, classes.icon_right)} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(Slider);
