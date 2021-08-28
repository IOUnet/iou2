import { Box, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles';
import useGetIOUs from '../../hooks/useGetIOUs'
import useGetIOUKeys from '../../hooks/useGetIOUKeys'


const TokensInfo = ({ classes, data }) => {
  const {  issuers  } = data;
  const dataIOUsList = useGetIOUs()
 //
  const dataIOUKeys = useGetIOUKeys()
  
  var tokens,keywords;
  if (dataIOUsList !== undefined) { 
   tokens = dataIOUsList.length;
   
  }
   if (dataIOUKeys !== undefined) { 
    keywords = dataIOUKeys.length;
    
   } 
  return (
    <Box className={classes.root} >
      <Typography className={classes.text}>
        {`IOUs already:  ${tokens}`}
        {(issuers || issuers === 0) && `, from ${issuers} issuers`} 
        {(keywords || keywords === 0) && `, with ${keywords} keywords`} 
      </Typography>
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(TokensInfo);
