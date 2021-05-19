import { call, take, put, fork, takeEvery, select, race } from 'redux-saga/effects'
import { GET_LIST_OF_TOKENS, ADD_IOU_TOKENS } from '../actions/types'

import Web3 from 'web3'
import { loadContractSpec, addAccount, loadContractInstance } from 'ethvtx/lib/dispatchers';
import { ControlPointDuplicateOutlined } from '@material-ui/icons';
import IOUtoken from '../../artifacts/IOUtoken.json';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';

async function GetListOfTokens (payload) {
    //const makeIOUContract = await getContract(payload.state, 'MakeIOU', '@makeiou')
    
    const tokensLength = await payload.contract._contract.methods.getIOUstotal()
                               .call()
    
    let addressList = []
    for (var i = 0; i < 2; i++) {
        let address = await payload.contract._contract.methods.allIOU(i).call()
        let token_name = 'Token'+i.toString()
        addressList.push({address,name:token_name})
    
        await loadContractSpec(payload.state.dispatch, token_name, IOUtoken.abi, {
            permanent: true
        })
        await loadContractInstance(payload.state.dispatch, token_name, address, {
            alias: '@token'+i.toString(),
            permanent: true, // By default false
            balance: true
        });
    }
    
    console.log(payload)
    console.log(tokensLength)
    //console.log(getAddress)
    return addressList;
}

const getTokensInfo = async (payload) => {
  console.log(payload)
  const tokens = payload.contractState.makeIOUReducer.tokens;
  const currentAccount = await payload.contractState.vtxconfig.web3.eth.getAccounts();
  for (var i = 0; i < tokens.length; i++) {
      let balance = ''
    //let balance = await getContract(payload.state, tokens[i].name, tokens[i].address)._contract.methods.balanceOf(currentAddress).call()
    console.log(balance, currentAccount)
  }
  
}




function* workerGetListOfToken(action) {

        const contract = action.payload.contract
        const state = action.payload.state
        const payload = {contract, state}
        const resultTokens = yield call(GetListOfTokens, payload)
        yield put({type:ADD_IOU_TOKENS,payload:resultTokens})
        const contractState = yield select();
        const tokensInfo = yield call(getTokensInfo,{state,contractState})
        // console.log(ahash.transactionHash)
        // yield put({type: BUY_INDEX_APPROVED,payload:{approve_hash:ahash.transactionHash}})
        // yield put({type: BUY_INDEX_TRX_START})
        // const bhash = yield call(buyIndexTokenProcess, payload)
        // yield put({type: BUY_INDEX_TRX_PROCESSED, payload:{buyindex_hash:bhash.transactionHash}})
        // //setTimeout(console.log('test timeout'), 1000);
        // yield put({type: BUY_INDEX_TRX_END})
 
    
}


export function* watchGetListOfToken() {
  
    yield takeEvery(GET_LIST_OF_TOKENS, workerGetListOfToken)
 
}