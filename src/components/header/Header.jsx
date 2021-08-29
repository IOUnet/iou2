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

import { Box } from '@material-ui/core';
import useGetIOUs from '../../hooks/useGetIOUstat'
import useGetIssuers from '../../hooks/useGetIssuersStat'
import useGetIOUKeys from '../../hooks/useGetIOUKeys'



const LinkBehavior = forwardRef((props, ref) => (
  <RouterLink ref={ref} to={ROUTES.main} {...props} />
));

const Header = ({ classes }) => {
  const [isNotifications, setIsNotifications] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const dataIOUsList = useGetIOUs()
  const dataIssuers = useGetIssuers()
  const dataIOUKeys = useGetIOUKeys()
  
  var tokens,keywords, issuers;
  if (dataIOUsList != undefined) { 
   tokens = dataIOUsList;
   
  }
   if (dataIOUKeys != undefined) { 
    keywords = dataIOUKeys.length;
    
   } 

   if (dataIssuers != undefined) { 
    issuers = dataIssuers;
    
   } 
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
      <Link component={LinkBehavior}  className={classes.mainLink}>
          <Typography component="h1" className={classes.title}>
              IOU dApp 
          </Typography>
        </Link>
        <Typography className={classes.text}>
        {`IOUs issued:  ${tokens}`}
        {`, with ${keywords} keywords`} 
        {`, issuers in system:  ${issuers}`}
      </Typography>
      </Toolbar>
    </AppBar>
  );
};

/**
 *  <IconButton
          aria-label="close"
          className={classes.button}
          onClick={() => console.log('close button clicked')}
        >
          <CloseIcon />
        </IconButton>

   

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
 */
export default withStyles(styles, { withTheme: true })(Header);
