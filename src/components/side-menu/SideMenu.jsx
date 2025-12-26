import React, {forwardRef} from 'react';
import styles from './styles';
import clsx from "clsx";
import { Link, Typography, IconButton, Grid, Box, SvgIcon } from '@mui/material';
import { withStyles } from '@mui/styles';
import {Link as RouterLink, useNavigate } from 'react-router-dom';
import {ROUTES} from "../../constants";
import Button from "../button/Button";
import BrandIconUrl from "../../assets/img/iou.svg";

const SideMenu = ({classes, menuActive, setMenuActive}) => {

  const navigate = useNavigate();

  const buttons = [
    {button: 'Create IOU', handler: () => navigate(ROUTES.mintEditToken)},
    {button: 'Buy IOU', handler: () => navigate(ROUTES.findBuyIOU)},
    {button: 'Issue IOU', handler: () => navigate(ROUTES.mintSelectToken)},
    {button: 'Payoff IOU', handler: () => navigate(ROUTES.payoffSelectToken)},
  ];

  return (
    <>
    <Box onClick={() => setMenuActive(false)} className={clsx(classes.shadow, menuActive ? classes.shadow_active : "")}>
    </Box>
    <Box className={clsx(classes.menu, menuActive ? classes.menu_active : "")}>
      <Box>
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Box
              component="img"
              className={classes.brand}
              src={BrandIconUrl}
              alt="IOU"
            />
          </Grid>
          {buttons.map(({button, handler}) => (
            <Grid item key={button} xs={12}>
                <Typography className={classes.typography} variant="h5" onClick={handler}>{button}</Typography>
            </Grid>
          ))}

        </Grid>
      </Box>
    </Box>
    </>

  )
}

export default withStyles(styles, {withTheme: true})(SideMenu);
