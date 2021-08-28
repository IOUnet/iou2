import { Box, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles';
import useGetIOUs from '../../hooks/useGetIOUs'


const TokensInfo = ({ classes, data }) => {
  const {  issuers, keywords } = data;
  const dataIOUsList = useGetIOUs()
  var tokens;
  if (dataIOUsList !== undefined) { 
   tokens = dataIOUsList.length;
   
  }
  return (
    <Box className={classes.root} >
      <Typography className={classes.text}>
        {`IOUs already:  ${tokens}`}
        {/* {(issuers || issuers === 0) && `, from ${issuers} issuers`}
        {(keywords || keywords === 0) && `, with ${keywords} keywords`} */}
      </Typography>
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(TokensInfo);
