import { Box, withStyles } from '@material-ui/core';
import React, { useEffect, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import Button from '../../components/button/Button';
import { ROUTES } from '../../constants';
import styles from './styles';
import useGetIOUs from '../../hooks/useGetIOUs'
import TokensListContext from '../../context/TokensListContext'



const MintSelectTokenPage = ({ classes }) => {
  

  const tokensList = useContext(TokensListContext)
  const dataIOUsList = useGetIOUs()


  const [listDataIOU, setListDataIOU] = useState([])
  const history = useHistory();

  const changeIOUDataList = useCallback((dataIOUsList) => {
    if (dataIOUsList != null) {
      setListDataIOU(dataIOUsList)

      for (let i = 0; i < 3; i++) {
        dataIOUsList[i].test = "test"
      }

      tokensList.setTokenList(dataIOUsList)
    }
  }, [tokensList])

  useEffect(() => {
    changeIOUDataList(dataIOUsList)
  }, [changeIOUDataList, dataIOUsList])

  const handleSelectIOU = (_, id) => {
    // console.log('cardId ---', id);
    history.push(ROUTES.mintSelectReceiver);
    tokensList.setCurrentToken(id)
  };

  return (
    <PageLayout>
      <Box className={classes.selectSection}>
        <PageTitle>Select IOU that you plan to give</PageTitle>
  
      </Box>

      <Box className={classes.listSection}>
        <TokenCardsList
          data={listDataIOU}
          onClick={handleSelectIOU}
          title={'Select IOU:'}
        />
      </Box>
    </PageLayout>
  );
};



export default withStyles(styles, { withTheme: true })(MintSelectTokenPage);
