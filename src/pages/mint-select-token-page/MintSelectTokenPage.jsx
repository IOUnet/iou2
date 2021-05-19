import { Box, withStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCardsList from '../../components/token-cards-list/TokenCardsList';
import Button from '../../components/button/Button';
import { ROUTES } from '../../constants';
import styles from './styles';
import { useDispatch, useSelector, useStore, connect } from 'react-redux';
import { cardListData } from '../../storybook-fake-data/storybook-fake-data';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';
import { GET_LIST_OF_TOKENS } from '../../ethvtx_config/actions/types';



const MintSelectTokenPage = ({ classes }) => {
  const history = useHistory();
  const dispatch = useDispatch()
  const current_state = useStore();
  //const currentAddress = useSelector(state => state)
  
  //const getContractInstance = useSelector(state => getTokensList())
  useEffect(() => {
    const contract = getContract(current_state, 'StoreIOUs', '@storeious');
    dispatch({type:GET_LIST_OF_TOKENS, payload:{contract, state:current_state}});
  // Safe to add dispatch to the dependencies array
    }, [dispatch, current_state]);
    
  // const store_contract = useSelector(state => getContract(state, 'StoreIOUs', '@storeious'))
  // console.log(store_contract, current_state)
  // const tokensInfo = []
  // const getTokensList = (state) => {
  //    const tokenList = state.makeIOUReducer.tokens;
  //    const currentAddress = state.vtxconfig.coinbase;
  //    for (var i = 0; i < tokenList.length; i++) {
  //      let balance = getContract(current_state, tokenList[i].name, tokenList[i].address)._contract.methods.balanceOf(currentAddress).call()
  //      console.log(balance)
  //    }
  // }
  // const tokens = useSelector(state => getTokensList(state))
  // console.log(tokens)
  //const makeIOUContract = useSelector(state => getContract(current_state, 'StoreIOU', '@storeiou').fn.listIOUs(state.vtxconfig.coinbase))
  
  const handleMakeNewIOU = () => {
    history.push(ROUTES.makeIOUToken1);
  };

  const handleSelectIOU = (_, id) => {
    console.log('cardId ---', id);
    history.push(ROUTES.mintSelectReceiver);
  };

  return (
    <PageLayout>
      <Box className={classes.selectSection}>
        <PageTitle>Give your IOU or</PageTitle>
        <Button onClick={handleMakeNewIOU}>
          make new IOU
        </Button>
      </Box>

      <Box className={classes.listSection}>
        <TokenCardsList
          data={cardListData.slice(0, 3)}
          onClick={handleSelectIOU}
          title={'Select IOU:'}
        />
      </Box>
    </PageLayout>
  );
};

const GetIOUList = async (state) => {
  // const current_state = useStore();
  const length = await getContract(state, 'StoreIOUs', '@storeious').fn.getIOUstotal()
  console.log(length)
  return length;
}

const mapStateToProps = (state) => {
  return {
      iouTokensList: GetIOUList(state),
  }}
//export default withStyles(styles, { withTheme: true })(MakeIOUToken1Page);

//export default connect(mapStateToProps,null)(withStyles(styles, { withTheme: true })(withStyles(styles, { withTheme: true })(MintSelectTokenPage)))
export default connect(mapStateToProps,null)(withStyles(styles, { withTheme: true })(MintSelectTokenPage));
