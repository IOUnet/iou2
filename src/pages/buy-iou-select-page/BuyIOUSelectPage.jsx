import { Box, withStyles } from '@material-ui/core';
import React, {useContext, useEffect, useState, useCallback} from 'react';

import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import { ROUTES } from '../../constants';
import styles from './styles';
import TokensListContext from '../../context/TokensListContext'
import useFindIOU from '../../hooks/useFindIOU'


const BuyIOUSelectPage = ({ classes }) => {
  const history = useHistory();
  const dataIOUsBuyListContext = useFindIOU()
  const tokenList = useContext(TokensListContext)
  const [values, setFormValues] = useState(tokenList.values) 

  const [dataIOUsBuyList, setDataIOUsBuyList] = useState(null)
  const [dataIOUsList] = useFindIOU()
  const [listDataIOU, setListDataIOU] = useState([])

  const changeIOUDataList = useCallback((dataIOUsList) => {
    if (dataIOUsList != null) {
      setListDataIOU(dataIOUsList)
      tokenList.setTokenList(dataIOUsList)
    }
  }, [tokenList])

  useEffect(() => {
    changeIOUDataList(dataIOUsList)
  }, [changeIOUDataList, dataIOUsList])
  


  const handleSelectIOU = (_, id) => {
    console.log('cardId ---', id);
    if (dataIOUsBuyList != null && dataIOUsBuyList !== undefined) {
      tokenList.setTokenList(dataIOUsBuyList)
      tokenList.setCurrentToken(id)
    }
    history.push(ROUTES.buyIOU);
  };

  const setData = useCallback((data) => {
    if(data !== null) {
      setDataIOUsBuyList(data)
    }
  },[]) /**setDataIOUsBuyList, dataIOUsBuyListContext */

  useEffect(() => {
      setData(dataIOUsBuyListContext)
  },[setData, dataIOUsBuyListContext]) /**setData, dataIOUsBuyListContext */


  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Select IOU to buy:</PageTitle>
      </Box>

      {dataIOUsBuyList && <Box className={classes.listSection}>
        <TokenCardsList
          data={listDataIOU}
          onClick={handleSelectIOU}
        />
      </Box>}
      {!dataIOUsBuyList && "Loading..." }
      
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(BuyIOUSelectPage);
