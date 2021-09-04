import { Box, withStyles } from '@material-ui/core';
import React, { useEffect, useCallback, useState, useContext }  from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import { ROUTES } from '../../constants';
import styles from './styles';
import useGetIOUs from '../../hooks/useGetIOUs'
import TokensListContext from '../../context/TokensListContext'


// import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

const StakeSelectTokenPage = ({ classes }) => {

  const tokensList = useContext(TokensListContext)
  const dataIOUsList = useGetIOUs()
  
  const [listDataIOU, setListDataIOU] = useState([])
  const history = useHistory();
  
  const changeIOUDataList = useCallback((dataIOUsList) => {
    if (dataIOUsList != null) {
      setListDataIOU(dataIOUsList)
      tokensList.setTokenList(dataIOUsList)
    }
  }, [tokensList])

  useEffect(() => {
    changeIOUDataList(dataIOUsList)
  }, [changeIOUDataList, dataIOUsList])
  

  const handleSelectIOU = (_, id) => {
    console.log('cardId ---', id);
    history.push(ROUTES.stakeAddPair);
    tokensList.setCurrentToken(id)
  };
  /* const history = useHistory();

  const handleSelectIOU = (_, id) => {
    console.log('cardId ---', id);
    history.push(ROUTES.stakeAddPair);
    
          <Box className={classes.listSection}>
        <TokenCardsList
          data={cardListData.slice(0, 4)}
          onClick={handleSelectIOU}
        />
      </Box>
*/
  

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Select IOU to stake:</PageTitle>
      </Box>

      <Box className={classes.listSection}>
        <TokenCardsList
          data={listDataIOU}
          onClick={handleSelectIOU}          
        />
      </Box>

    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(StakeSelectTokenPage);
