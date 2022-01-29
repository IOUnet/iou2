import { Box, List, ListItem, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import TokenCard from '../token-card/TokenCard';
import PageTitle from '../page-title/PageTitle';
import styles from './styles';

const TokenCardsList = ({ classes, title, data, onClick, ...others }) => {
  const handleCardClick = (evt, id) => {
    onClick(evt, id);
  };

  if (!data.length) {
    return (
      <Box className={classes.root}>
        {title && <PageTitle className={classes.title}>{title}</PageTitle>}
        <List className={classes.list}>
          <Typography align="center">List is empty</Typography>
        </List>
      </Box>
    );
  }

  const items = data.map((tokenData) => (
    <ListItem
      key={tokenData.id}
      button
      className={classes.listItem}
      disabled={tokenData.id === others.disabledId}
      id={tokenData.id}
      onClick={(evt) => handleCardClick(evt, tokenData.id)}
      selected={tokenData.id === others.selectedId}
    >
      <TokenCard data={tokenData} />
    </ListItem>
  ));

  return (
    <Box className={classes.root}>
      {title && <PageTitle className={classes.title}>{title}</PageTitle>}
      <List className={classes.list}>{items}</List>
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(TokenCardsList);
