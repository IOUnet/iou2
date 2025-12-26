import { Box } from '@mui/material';
import { withStyles } from '@mui/styles';
import React, { useEffect, useCallback, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCardsEdit from '../../components/token-cards-edit/TokenCardsEdit';
import Button from '../../components/button/Button';
import { ROUTES } from '../../constants';
import styles from './styles';
import useGetIOUs from '../../hooks/useGetIOUs'
import TokensListContext from '../../context/TokensListContext'



const MintEditTokenPage = ({ classes }) => {
  

  const tokensList = useContext(TokensListContext)
  const dataIOUsList = useGetIOUs()
  
  const [listDataIOU, setListDataIOU] = useState([])
  const navigate = useNavigate();
  
  const changeIOUDataList = useCallback((dataIOUsList) => {
    if (dataIOUsList != null) {
      setListDataIOU(dataIOUsList)
      tokensList.setTokenList(dataIOUsList)
    }
  }, [tokensList])

  useEffect(() => {
    changeIOUDataList(dataIOUsList)
  }, [changeIOUDataList, dataIOUsList])
  
  const handleMakeNewIOU = () => {
    navigate(ROUTES.makeIOUToken1);
  };

  const handleSelectIOU = (_, id) => {
    console.log('cardId ---', id);
    navigate(ROUTES.editorIOU);
    tokensList.setCurrentToken(id)
  };

  return (
    <PageLayout>
      <Box className={classes.selectSection}>
        <PageTitle>Edit your IOUs or</PageTitle>
        <Button onClick={handleMakeNewIOU}>
          make new IOU
        </Button>
      </Box>

      <Box className={classes.listSection}>
        <TokenCardsEdit
          data={listDataIOU}
          onClick={handleSelectIOU}
          title={'Select IOU:'}
        />
      </Box>
    </PageLayout>
  );
};



export default withStyles(styles, { withTheme: true })(MintEditTokenPage);
