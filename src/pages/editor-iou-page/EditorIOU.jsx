import { Box, CardHeader, SvgIcon, Typography, withStyles } from '@material-ui/core';
import React, { useState, useContext, useEffect, useCallback } from 'react';
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


const EditorIOUPage = ({ classes }) => {
  const history = useHistory();
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [comment, setComment] = useState('')
  const [cardTokenData, setCardTokenData] = useState({

  })
  const tokenList = useContext(TokensListContext)
  const [ editIOUPhone, editIOUDescr] = useEditIOU()
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
      setFormValues(values => ({...values, [e.target.id]:e.target.value}))
    }, [],
  );

  useEffect(() => {
    setCurrentTokenData()
  },[setCurrentTokenData, tokenList])

  const handleSendPhone = () => {
    const tokenData = tokenList.tokenList[tokenList.currentTokenID];
    editIOUPhone(values, tokenData.address)

  };
  const handleSendDescr = () => {
    const tokenData = tokenList.tokenList[tokenList.currentTokenID];
    editIOUDescr(values, tokenData.address)

  };
 /*  const handleQR = () => {
    console.log('QR button clicked');
  };
        <Button onClick={handleQR}>
          <SvgIcon className={classes.qr_ico} component={QRIcon} viewBox="0 0 124 92" />
        </Button>
 */
  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Edit your IOU:</PageTitle>
      </Box>

      <Box className={classes.cardSection}>
        <TokenCard data={cardTokenData} />
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

      <Box className={classes.actionSection}>

      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(EditorIOUPage);
