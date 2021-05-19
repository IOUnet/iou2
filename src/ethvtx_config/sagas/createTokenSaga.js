import { call, take, put, fork, takeEvery, select, race } from 'redux-saga/effects'
import { MAKE_IOU_TOKEN } from '../actions/types'
import web3 from 'web3'
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';


const makeIOUTokenContract = async (payload) => {
    //const makeIOUContract = await getContract(payload.state, 'MakeIOU', '@makeiou')
    console.log(payload)
    const units = await web3.utils.asciiToHex("test")
    const keyword = await web3.utils.asciiToHex("test")
    const resultIOUCreate = await payload.data.contract._contract.methods.makeIOU(
        "Test","TST","Sergey","Face","Description","Location",units,[keyword]
    ).send({from: payload.state.vtxconfig.coinbase})
    
    console.log(resultIOUCreate)
    //let amount_in_wei = await web3.utils.toWei(payload.ITAmount);
    // try {
    //     const hash = await payload.svetToken._contract.methods
    //         .approve( payload.ITokContract._address, amount_in_wei)
    //         .send({from: payload.currentAddress})
    //     return hash
    // } catch {
    //     return false
    // }
    
}



function* workerMakeIOUToken(action) {

        const values = action.payload
        const state = yield select();
        const payload = {data:values, state}
        const trxHash = yield call(makeIOUTokenContract, payload)
        
        // console.log(ahash.transactionHash)
        // yield put({type: BUY_INDEX_APPROVED,payload:{approve_hash:ahash.transactionHash}})
        // yield put({type: BUY_INDEX_TRX_START})
        // const bhash = yield call(buyIndexTokenProcess, payload)
        // yield put({type: BUY_INDEX_TRX_PROCESSED, payload:{buyindex_hash:bhash.transactionHash}})
        // //setTimeout(console.log('test timeout'), 1000);
        // yield put({type: BUY_INDEX_TRX_END})
 
    
}


export function* watchMakeIOUToken() {
  
    yield takeEvery(MAKE_IOU_TOKEN, workerMakeIOUToken)
 
}