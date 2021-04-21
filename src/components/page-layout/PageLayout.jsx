import { Box, Container, withStyles } from '@material-ui/core';
import React from 'react';
import Header from '../header/Header';
import styles from './styles';

const PageLayout = ({ classes, children }) => {
  return (
    <Container className={classes.root}>
      <Header />
      <Box className={classes.main} component="main">
        {children}
      </Box>
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(PageLayout);
