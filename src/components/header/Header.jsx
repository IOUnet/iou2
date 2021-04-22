import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import StarIcon from '@material-ui/icons/Star';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ShareIcon from '@material-ui/icons/Share';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import styles from './styles';

const Header = ({ classes }) => {
  const [isNotifications, setIsNotifications] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCloseClick = () => {
    console.log('close button clicked');
  };

  const handleShareClick = () => {
    console.log('share button clicked');
  };

  const handleFavoriteClick = () => {
    setIsFavorite((s) => !s);
  };

  const handleNotificationClick = () => {
    setIsNotifications((s) => !s);
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

        <Typography component="h1" className={classes.title}>
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
          aria-label="favorite"
          className={clsx(classes.button, isFavorite && classes.button_active)}
          onClick={handleFavoriteClick}
        >
          <StarIcon/>
        </IconButton>

        <IconButton
          aria-label="notification"
          className={clsx(classes.button, isNotifications && classes.button_active)}
          onClick={handleNotificationClick}
        >
          <NotificationsIcon/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles, { withTheme: true })(Header);
