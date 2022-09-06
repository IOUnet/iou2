import { Box, Container, withStyles } from '@material-ui/core';
import React, {useState} from 'react';
import Header from '../header/Header';
import styles from './styles';
import SideMenu from "../side-menu/SideMenu";

const PageLayout = ({ classes, children }) => {

  const [menuActive, setMenuActive] = useState(false);

  return (
    <Container className={classes.root}>
      <SideMenu menuActive={menuActive} setMenuActive={setMenuActive} />
      <Header setMenuVisibility={() => setMenuActive(!menuActive)} />
      <Box className={classes.main} component="main">
        {children}
      </Box>
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(PageLayout);
