import { Box, List, ListItem, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import TokenCard from '../token-card/TokenCard';
import styles from './styles';

//-------------------------
const disabledId = 'id2';
const selectedId = 'id3';
//-------------------------

const TokenCardsList = ({ classes, title, data, onClick }) => {
  if (!data.length) {
    return (
      <Box className={classes.root}>
        <Typography className={classes.title} variant="subtitle1">{title}</Typography>
        <List className={classes.list}>
          <Typography align="center">List is empty</Typography>
        </List>
      </Box>
    );
  }

  const items = data.map(({ id, ...props }) => (
    <ListItem
      key={id}
      button
      className={classes.listItem}
      disabled={id === disabledId}
      id={id}
      onClick={onClick}
      selected={id === selectedId}
    >
      <TokenCard data={props} />
    </ListItem>
  ));

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} variant="subtitle1">{title}</Typography>
      <List className={classes.list}>
        {items}
      </List>
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(TokenCardsList);
