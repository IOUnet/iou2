import { Box } from '@mui/material';
import { withStyles } from '@mui/styles';
import React, {useContext, useEffect, useState, useCallback} from 'react';

import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import { ROUTES } from '../../constants';
import styles from './styles';
import TokensListContext from '../../context/TokensListContext'
import useFindIOU from '../../hooks/useFindIOU'

const BuyIOUSelectPage = ({ classes }) => {

  const navigate = useNavigate();
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
    if (dataIOUsBuyList != null && dataIOUsBuyList !== undefined) {
    //  tokenList.setTokenList(dataIOUsBuyList)

      tokenList.setCurrentToken(id)
    }

    // Replace legacy Drizzle web3 usage with a minimal EIP-1193 call.
    // This keeps the build working without the Drizzle dependency.
    const go = async () => {
      try {
        const chainIdHex = await window.ethereum?.request?.({ method: 'eth_chainId' })
        navigate(`${ROUTES.buyIOU}/${chainIdHex}/${listDataIOU[id].address}`)
      } catch (e) {
        // Fallback: navigate without chainId if provider is unavailable
        navigate(`${ROUTES.buyIOU}/0x0/${listDataIOU[id].address}`)
      }
    }

    go()

  };

/*   const setData = useCallback((data) => {
    if(data !== null) {
      setDataIOUsBuyList(data)
    }
  },[]) /**setDataIOUsBuyList, dataIOUsBuyListContext 

  useEffect(() => {
      setData(dataIOUsBuyListContext)
  },[setData, dataIOUsBuyListContext]) /**setData, dataIOUsBuyListContext 
 */

  const setData = useCallback((data) => {
    if(data !== null) {
      setDataIOUsBuyList(data)
    }
  },[setDataIOUsBuyList]) 
  useEffect(() => {
      setData(dataIOUsBuyListContext)
  },[setData])

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
