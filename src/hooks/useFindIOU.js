import React, { useEffect, useState, useCallback, useContext, useMemo } from 'react'
import { useHistory, Redirect, useParams } from 'react-router-dom';
import {drizzleReactHooks} from '@drizzle/react-plugin';
import Web3 from 'web3';
import TokensListContext from '../context/TokensListContext';
import {getFeedbacks} from '../helpers/getFeedbacks';
import {getAllIOUs} from "../helpers/getAllIOUs";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;


export default function useFindIOU(factory, deps) {

  const params = useParams();
  const {drizzle} = useDrizzle();
  const drizzleState = useDrizzleState(state => state);
  const [IOUAddreses, setIOUAddreses] = useState();
  const [IOUList, setIOUList] = useState();
  const [feedbackList, setFeedbackList] = useState(null);
  const [tokenHolders, setTokenHolders] = useState(null);
  const {StoreIOUs, ProxyIOU, IOUtoken} = drizzleState.contracts;

  const tokenList = useContext(TokensListContext)
  const [values, setFormValues] = useState(tokenList.values)


  const changeIOUListAddreses = useCallback((addressList) => {
    setIOUAddreses(addressList);
  }, [setIOUAddreses]);

  const changeIOUList = useCallback((listItem) => {
      setIOUList(listItem)
  },[setIOUList]);

  useEffect(() => {
      const storeIOU = drizzle.contracts.StoreIOUs
      if (values.searchStreet) {
        const getIOUsTrx = storeIOU.methods["getIOUsbyStreet"].cacheCall(Web3.utils.utf8ToHex(values.keyword.trim().toLowerCase()),
          values.country.trim(),
          values.state.trim(),
          values.city.trim(),
          values.street.trim());
        if (getIOUsTrx !== undefined) {
          const result = StoreIOUs.getIOUsbyStreet[getIOUsTrx];
          if (result !== undefined) {
            changeIOUListAddreses(result.value);
          }
        }
      } else if (values.searchLocation) {
        const getIOUsTrx = storeIOU.methods["getIOUsbyCity"].cacheCall(Web3.utils.utf8ToHex(values.keyword.trim().toLowerCase()),
          values.country.trim(),
          values.state.trim(),
          values.city.trim());
        if (getIOUsTrx !== undefined) {
          const result = StoreIOUs.getIOUsbyCity[getIOUsTrx];
          if (result !== undefined) {
            changeIOUListAddreses(result.value);
          }
        }
      } else if (values.keyword) {
        const getIOUsTrx = storeIOU.methods["getIOUListKey"].cacheCall(Web3.utils.utf8ToHex(values.keyword.trim().toLowerCase()));

        if (getIOUsTrx !== undefined) {
          const result = StoreIOUs.getIOUListKey[getIOUsTrx];
          if (result !== undefined) {
            changeIOUListAddreses(result.value);
          }
        }

      } else {

        const getIOUsTrx = storeIOU.methods["getIOUList"].cacheCall(drizzleState.accounts[0])

        if (getIOUsTrx !== undefined) {
          const res = StoreIOUs.getIOUList[getIOUsTrx]
          if (res !== undefined) {
            changeIOUListAddreses(res.value);
          }
        }

        if (IOUList) {
          tokenList.setTokenList(IOUList)
          let indx = IOUAddreses.indexOf(params.tokenAddress);
          tokenList.setCurrentToken(indx);
        }
      }
    }, [changeIOUListAddreses, drizzleState, drizzle, StoreIOUs, values]);

  /*
        const findIOU = (values) => {
              const storeIOU = drizzle.contracts.StoreIOUs
          if (values.searchStreet) {
              const getIOUsTrx = storeIOU.methods["getIOUsbyCity"].cacheCall( Web3.utils.utf8ToHex(values.keyword), values.country, values.state, values.city, values.street);
              if (getIOUsTrx !== undefined) {
              const result = StoreIOUs.getIOUsbyCity[getIOUsTrx];
              if (result !== undefined) {
                //  changeIOUListAddreses( result.value);
                return  result.value;
              }
              }
          } else if (values.searchLocation) {
              const getIOUsTrx = storeIOU.methods["getIOUsbyCity"].cacheCall( Web3.utils.utf8ToHex(values.keyword), values.country, values.state, values.city);
              if (getIOUsTrx !== undefined) {
              const result = StoreIOUs.getIOUsbyCity[getIOUsTrx];
              if (result !== undefined) {
               //   changeIOUListAddreses( result.value);
               return  result.value;

               }
              }
          } else {
              const getIOUsTrx = storeIOU.methods["getIOUListKey"].cacheCall( Web3.utils.utf8ToHex(values.keyword), {from: drizzleState.accounts[0]});
              if (getIOUsTrx !== undefined) {
              const result = StoreIOUs.getIOUListKey[getIOUsTrx];
              if (result !== undefined) {
                //  changeIOUListAddreses( result.value);
                return  result.value;

                }
              }
          }
      } */

  useEffect(
    () => {
      const proxyIOU = drizzle.contracts.ProxyIOU

      if (IOUAddreses !== undefined && IOUAddreses != null) {

        const IOUListObjects = []
        for (var i = 0; i < IOUAddreses.length; i++) {

          const resultTrx = proxyIOU.methods["getIOU"].cacheCall(IOUAddreses[i]);

          if (resultTrx !== undefined) {
            const resultItem = ProxyIOU.getIOU[resultTrx]


            if (resultItem !== undefined) {

              let keys = resultItem.value.description.keywords.map((value, key) => {
                return drizzle.web3.utils.hexToUtf8(value)
              })



              const feedbacks = getFeedbacks(drizzle, drizzleState, IOUAddreses[i])
              const holders = getAllIOUs(drizzle, drizzleState, IOUAddreses[i]);

              if (feedbacks.length === 0) {
                setFeedbackList(feedbacks)
              }

              IOUListObjects.push({
                id: i,
                title: resultItem.value.name,
                symbol: resultItem.value.symbol,
                count: i,
                description: resultItem.value.description.description,
                issuerName: resultItem.value.description.myName,
                issuerAddr: resultItem.value.description.issuer,
                socialProfile: resultItem.value.description.socialProfile,
                keys: keys.join(','),
                portfolio: "coming soon...",

                address: IOUAddreses[i],
                minted: drizzle.web3.utils.fromWei(resultItem.value.description.totalMinted),
                payed: drizzle.web3.utils.fromWei(resultItem.value.description.totalBurned),
                rating: resultItem.value.description.avRate,
                units: drizzle.web3.utils.hexToUtf8(resultItem.value.description.units),
                location: (resultItem.value.description.location),

                phone: drizzle.web3.utils.hexToUtf8(resultItem.value.description.phone),
                feedbacks,
                holders,
              })

              changeIOUList(IOUListObjects)
            }
          }
        }
      }

    }, [changeIOUList, IOUAddreses, drizzle, ProxyIOU.getIOU, feedbackList, tokenHolders])

  return [IOUList]
// IOUList, IOUAddreses, 
}