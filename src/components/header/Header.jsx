import {
  AppBar,
  IconButton,
  Link,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import StarIcon from '@material-ui/icons/Star';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ShareIcon from '@material-ui/icons/Share';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState, forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import styles from './styles';

const LinkBehavior = forwardRef((props, ref) => (
  <RouterLink ref={ref} to={ROUTES.main} {...props} />
));

const Header = ({ classes }) => {
  const [isNotifications, setIsNotifications] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
        <IconButton
          aria-label="close"
          className={classes.button}
          onClick={() => console.log('close button clicked')}
        >
          <CloseIcon />
        </IconButton>

        <Link component={LinkBehavior}  className={classes.mainLink}>
          <Typography component="h1" className={classes.title}>
              IOUnet
          </Typography>
        </Link>

        <IconButton
          aria-label="share"
          className={classes.button}
          onClick={() => console.log('share button clicked')}
        >
          <ShareIcon />
        </IconButton>

        <IconButton
          aria-label="favorite"
          className={clsx(classes.button, isFavorite && classes.button_active)}
          onClick={() => setIsFavorite((s) => !s)}
        >
          <StarIcon/>
        </IconButton>

        <IconButton
          aria-label="notification"
          className={clsx(classes.button, isNotifications && classes.button_active)}
          onClick={() => setIsNotifications((s) => !s)}
        >
          <NotificationsIcon/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles, { withTheme: true })(Header);
