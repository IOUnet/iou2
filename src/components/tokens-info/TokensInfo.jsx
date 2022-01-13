import { Box, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles';
import useGetIOUs from '../../hooks/useGetIOUstat'
import useGetIssuers from '../../hooks/useGetIssuersStat'
import useGetIOUKeys from '../../hooks/useGetIOUKeys'


const TokensInfo = ({ classes, data }) => {
//  const {  issuers  } = data;         {(issuers || issuers === 0) && `, from ${issuers} issuers`} 

  const dataIOUsList = useGetIOUs()
  const dataIssuers = useGetIssuers()
  const dataIOUKeys = useGetIOUKeys()
  
  var tokens,keywords, issuers;
  if (dataIOUsList !== undefined) { 
   tokens = dataIOUsList;
   
  }
   if (dataIOUKeys !== undefined) { 
    keywords = dataIOUKeys.length;
    
   } 

   if (dataIssuers !== undefined) { 
    issuers = dataIssuers;
    
   } 
  return (
    <Box className={classes.root} >
      <Typography className={classes.text}>
        {`IOUs issued:  ${tokens}`}
        {`, with ${keywords} keywords`} 
        {`, issuers in system:  ${issuers}`}
      </Typography>
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(TokensInfo);
