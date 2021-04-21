import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ShareIcon from '@material-ui/icons/Share';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import styles from './styles';

const Header = ({ classes }) => {
  const handleCloseClick = () => {
    console.log('close button clicked');
  };

  const handleShareClick = () => {
    console.log('share button clicked');
  };

  const handleStarClick = () => {
    console.log('star button clicked');
  };

  const handleNotificationClick = () => {
    console.log('notification button clicked');
  };

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
        <IconButton
          aria-label="close"
          className={classes.button}
          onClick={handleCloseClick}
        >
          <CloseIcon />
        </IconButton>

        <Typography component="h1" variant="subtitle1" className={classes.title}>
          IOUnet
        </Typography>

        <IconButton
          aria-label="share"
          className={classes.button}
          onClick={handleShareClick}
        >
          <ShareIcon />
        </IconButton>

        <IconButton
          aria-label="star"
          className={classes.button}
          onClick={handleStarClick}
        >
          <StarIcon/>
        </IconButton>

        <IconButton
          aria-label="notification"
          className={classes.button}
          onClick={handleNotificationClick}
        >
          <NotificationsIcon/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles, { withTheme: true })(Header);
