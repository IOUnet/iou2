import {Box, CheckBox, CardHeader, SvgIcon, Typography, withStyles, Grid} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import React, { useState, useContext, useEffect, useCallback } from 'react';
import {drizzleReactHooks} from '@drizzle/react-plugin';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCard from '../../components/token-card/TokenCard';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { ReactComponent as QRIcon } from '../../assets/img/QRico.svg';
import { ROUTES } from '../../constants';
import styles from './styles';
import TokensListContext from '../../context/TokensListContext'
import useEditIOU from '../../hooks/useEditIOU'
import EditIOUContext from '../../context/EditIOUContext'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const EditorIOUPage = ({ classes }) => {
  const history = useHistory();
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [comment, setComment] = useState('')
  const [chainId, setChainId] = useState('');
  const [checked, setChecked] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [cardTokenData, setCardTokenData] = useState({

  })

  const { drizzle } = useDrizzle();
  const tokenList = useContext(TokensListContext)
  const tokenData = tokenList.tokenList[tokenList.currentTokenID];

  const [ editIOUPhone, editIOUDescr, editIOUGeo, editAddKeys, editDelKeys]  = useEditIOU()
  const editIOU = useContext(EditIOUContext)

  const [values, setFormValues] = useState(editIOU.values) 

  const setCurrentTokenData = useCallback(() => {
     if (tokenList.tokenList.length > 0) {
      const tokenData = tokenList.tokenList[tokenList.currentTokenID]
      setCardTokenData(tokenData)
     }
  },[tokenList])

  const onChangeHandler = useCallback(
    (e) => {
      if (e.target.id === "keywords") {
        setFormValues(values => ({...values, [e.target.id]:e.target.value.split(',')}))
      } else {
        setFormValues(values => ({...values, [e.target.id]:e.target.value}))
      }    }, [],
  );

  useEffect(() => {
    (async () => {
      if (drizzle.web3.eth) {
        drizzle.web3.eth.net.getId()
          .then(chainId => {
            const hexChainId = drizzle.web3.utils.toHex(chainId);
            setChainId(hexChainId);
          })
      }
    } )()
  }, [])

  console.log(drizzle)

  useEffect(() => {
    setCurrentTokenData()
  },[setCurrentTokenData, tokenList])

  const getTokenLink = async () => {
    navigator.clipboard.writeText(`${window.origin}${ROUTES.buyIOU}/${chainId}/${tokenList.tokenList[tokenList.currentTokenID].address}`);
    setIsCopied(true);
  }

  const handleSendPhone = () => {
    editIOUPhone(values, tokenData.address)

  };
  const handleSendDescr = () => {
    // const tokenData = tokenList.tokenList[tokenList.currentTokenID];
    editIOUDescr(values, tokenData.address)

  };

  const handleSendGeo = () => {
    // const tokenData = tokenList.tokenList[tokenList.currentTokenID];
    editIOUGeo(values, tokenData.address)

  };

  const handleSendAddKeys = () => {
    // const tokenData = tokenList.tokenList[tokenList.currentTokenID];
    editAddKeys(values, tokenData.address)

  };
  const handleCheck = (e) => {
    var updatedList = [...checked];
    if (e.target.checked) {
      updatedList = [...checked, e.target.value];
    } else {
      updatedList.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(updatedList);
    setFormValues(values => ({...values, [e.target.id]:updatedList}))

  };

  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

    const handleSendDelKeys = () => {
      // const tokenData = tokenList.tokenList[tokenList.currentTokenID];
      editDelKeys(values, tokenData.address)
  
    };
 /*  const handleQR = () => {
    console.log('QR button clicked');
  };
        <Button onClick={handleQR}>
          <SvgIcon className={classes.qr_ico} component={QRIcon} viewBox="0 0 124 92" />
        </Button>
 */

  console.log(chainId)

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Edit your IOU:</PageTitle>
      </Box>

      <Box className={classes.cardSection}>
        <TokenCard data={cardTokenData} />
      </Box>


      <Box className={classes.dataSection}>
        <PageTitle>Share my IOU</PageTitle>

        <Box>
          <Grid container>
            <Grid xs={11}>
              <Input
                disabled
                inputProps={{
                  value: `${window.origin}/${ROUTES.buyIOU}/${chainId}/${tokenList.tokenList[tokenList.currentTokenID].address}`
                }}
              />
            </Grid>
            <Grid
              item
              xs={1}
              style={{display: "flex"}}
              alignItems="center"
              justifyContent="center"
            >
              { isCopied &&
                <Typography>
                  Copied!
                </Typography>
              }
            </Grid>
          </Grid>
          {/*<FileCopyIcon style={{cursor: "pointer"}} color="disabled" onClick={getTokenLink} />*/}
          <Button onClick={getTokenLink}>
            Copy token link
          </Button>
        </Box>
      </Box>

      <Box className={classes.dataSection}>

      <Input
          id='phone'
          label={'enter new phone number'}
          name='phone'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.phone,
          }}
        />
        <Button onClick={handleSendPhone}>
          Save new phone
        </Button>
     
      </Box>

      <Box className={classes.dataSection}>
     

     <Input
       id='description'
       label={'Enter new description for IOU'}
       name='description'
       inputProps={{
         onChange: (e) => onChangeHandler(e) ,
         value: values.description,
       }}
     />
        <Button onClick={handleSendDescr}>
          Save new description
        </Button>
     

    
   </Box>
   <Box className={classes.pageTitle}>
        <PageTitle>Edit IOU: Address</PageTitle>
      </Box>

      <Box className={classes.dataSection}>
        <Input
          id='country'
          label={'Country'}
          name='country'
          inputProps ={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.country,
          }}
        />

        <Input
          id='state'
          label={'State/Region'}
          name='region'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.state,
          }}
        />

        <Input
          id='city'
          label={'City/Town'}
          name='city'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.city,
          }}
        />

        <Input
          id='street'
          label={'Street/Block'}
          name='street'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.street,
          }}
        />

    <Button onClick={handleSendGeo}>
          Save new geo address
        </Button>       
      </Box>

      <Box className={classes.dataSection}>
     
      <PageTitle>Add your IOU keywords:</PageTitle>

     <Input
       id='keywords'
       label={'New keywords for IOU (max is 5 keys, separated by comma)'}
       name='keywords'
       inputProps={{
         onChange: (e) => onChangeHandler(e) ,
         value: values.keywords,
       }}
     />

    <Button onClick={handleSendAddKeys}>
          Save new keywords
        </Button>  

   </Box>

      <Box className={classes.actionSection}>
      <PageTitle>Delete your IOU keywords:</PageTitle>
    <div className="checkList">
        
        <div className="list-container">
          {tokenData.keys.split(',').map((item, index) => (
            <div key={index}>
              <input   
                id='keyList'        
                name='keyList'
                value={item} 
                type="checkbox" 
                onChange={handleCheck} />
              <span className={isChecked(item)}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSendDelKeys}>
        {`Delete selected keywords: ${checkedItems}`}
        </Button>  
    
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(EditorIOUPage);
