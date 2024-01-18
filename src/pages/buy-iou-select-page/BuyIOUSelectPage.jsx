import { Box, withStyles } from "@material-ui/core";
import React, { useContext, useEffect, useState, useCallback } from "react";

import { useHistory } from "react-router-dom";
import PageLayout from "../../components/page-layout/PageLayout";
import PageTitle from "../../components/page-title/PageTitle";
import TokenCardsList from "../../components/token-cards-list/TokenCardsList";
import { ROUTES } from "../../constants";
import styles from "./styles";
import TokensListContext from "../../context/TokensListContext";
import useFindIOU from "../../hooks/useFindIOU";
import { drizzleReactHooks } from "@drizzle/react-plugin";
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const BuyIOUSelectPage = ({ classes }) => {
  const history = useHistory();
  const dataIOUsBuyListContext = useFindIOU();
  const tokenList = useContext(TokensListContext);
  const [values, setFormValues] = useState(tokenList.values);
  const { drizzle } = useDrizzle();

  const [dataIOUsBuyList, setDataIOUsBuyList] = useState(null);
  const [dataIOUsList] = useFindIOU();
  const [listDataIOU, setListDataIOU] = useState([]);

  const changeIOUDataList = useCallback(
    (dataIOUsList) => {
      if (dataIOUsList != null) {
        setListDataIOU(dataIOUsList);
        tokenList.setTokenList(dataIOUsList);
      }
    },
    [tokenList]
  );

  useEffect(() => {
    changeIOUDataList(dataIOUsList);
  }, [changeIOUDataList, dataIOUsList]);

  const handleSelectIOU = (_, id) => {
    if (dataIOUsBuyList != null && dataIOUsBuyList !== undefined) {
      //  tokenList.setTokenList(dataIOUsBuyList)

      tokenList.setCurrentToken(id);
    }

    drizzle.web3.eth.net.getId().then((res) => {
      const hexRes = drizzle.web3.utils.toHex(res);
      history.push(`${ROUTES.buyIOU}/${hexRes}/${listDataIOU[id].address}`);
    });
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

  const setData = useCallback(
    (data) => {
      if (data !== null) {
        setDataIOUsBuyList(data);
      }
    },
    [setDataIOUsBuyList]
  );
  useEffect(() => {
    setData(dataIOUsBuyListContext);
  }, [setData]);

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Select IOU Talimtoken to buy:</PageTitle>
      </Box>

      {dataIOUsBuyList && (
        <Box className={classes.listSection}>
          <TokenCardsList data={listDataIOU} onClick={handleSelectIOU} />
        </Box>
      )}
      {!dataIOUsBuyList && "Loading..."}
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(BuyIOUSelectPage);
