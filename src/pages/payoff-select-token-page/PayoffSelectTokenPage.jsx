import { Box, withStyles } from '@material-ui/core';
import React, {useContext, useEffect, useState, useCallback} from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import { ROUTES } from '../../constants';
import styles from './styles';
import useGetIOUsPayof from '../../hooks/useGetIOUsPayof'
import TokensListContext from '../../context/TokensListContext'


const PayoffSelectTokenPage = ({ classes }) => {
  const history = useHistory();
  const dataIOUsPayofListContext = useGetIOUsPayof()
  const tokenList = useContext(TokensListContext)
  const [dataIOUsPayofList, setDataIOUsPayofList] = useState(null)

  const handleSelectIOU = (_, id) => {
    console.log('cardId ---', id);
    if (dataIOUsPayofList != null && dataIOUsPayofList !== undefined) {
      tokenList.setTokenList(dataIOUsPayofList)
      tokenList.setCurrentToken(id)
    }
    history.push(ROUTES.payoffAndFeedback);
  };

  const setData = useCallback((data) => {
    if(data !== null) {
      setDataIOUsPayofList(data)
    }
  },[setDataIOUsPayofList])

  useEffect(() => {
      setData(dataIOUsPayofListContext)
  },[setData, dataIOUsPayofListContext])

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Select IOU to payoff:</PageTitle>
      </Box>
      {dataIOUsPayofList && <Box className={classes.listSection}>
        <TokenCardsList
          data={dataIOUsPayofList}
          onClick={handleSelectIOU}
        />
      </Box>}
      {!dataIOUsPayofList && "Loading..." }
      
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(PayoffSelectTokenPage);
