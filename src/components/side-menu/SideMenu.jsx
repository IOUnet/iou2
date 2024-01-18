import React, {forwardRef} from 'react';
import styles from './styles';
import clsx from "clsx";
import {Link, Typography, withStyles, IconButton, Grid, Box, SvgIcon} from "@material-ui/core";
import {Link as RouterLink, useHistory } from "react-router-dom";
import {ROUTES} from "../../constants";
import Button from "../button/Button";
import {ReactComponent as BrandIcon} from "../../assets/img/iou.svg";

const SideMenu = ({classes, menuActive, setMenuActive}) => {

  const history = useHistory();

  const buttons = [
    {button: 'Create Talimtoken', handler: () => history.push(ROUTES.mintEditToken)},
    {button: 'Buy Talimtoken', handler: () => history.push(ROUTES.findBuyIOU)},
    {button: 'Issue Talimtoken', handler: () => history.push(ROUTES.mintSelectToken)},
    {button: 'Payoff Talimtoken', handler: () => history.push(ROUTES.payoffSelectToken)},
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
            <SvgIcon className={classes.brand} component={BrandIcon} viewBox="0 0 95 80" />
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