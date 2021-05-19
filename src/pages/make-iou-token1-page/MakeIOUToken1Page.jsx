import { Box, withStyles } from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { ROUTES } from '../../constants';
import styles from './styles';
import  makeIOUPageOne from '../../ethvtx_config/actions/makeIOUPageOne';

var initialStateForm = {
  //tokenName: 'Best token ever',
  // symbol:'BTE',
  // surname:'Smith',
  // unit:'hours',
  // social:'https://facebook.com/smith',
  // description: 'Very good token for my job',
  // keywords:'tokens, art, development'

}

const MakeIOUToken1Page = (props) => {
  const classes = props.classes;
  const history = useHistory();
  const [values, setFormValues] = useState({});
  const dispatch = useDispatch()
  
  const onChangeHandler = useCallback(
    (e) => {
      setFormValues(values => ({...values, [e.target.id]:e.target.value}))
    }, [],
  );
  const handleNext = () => {
    history.push(ROUTES.makeIOUToken2);
    dispatch(makeIOUPageOne(values));
  };

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Make new IOU: Description</PageTitle>
      </Box>

      <Box className={classes.dataSection}>
        <Input
          id='tokenName'
          label={'ERC20 token name (12 char)'}
          name="tokenName"
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.tokenName,
          }}
        />

        <Input
          id='symbol'
          label={'ERC20 token symbol (4 char)'}
          name='symbol'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.symbol,
          }}
        />

        <Input
          id='surname'
          label={'You name, surname (up to 255 chr)'}
          name='surname'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.surname,
          }}
        />

        <Input
          id='social'
          label={'Your profile in social networks'}
          name='social'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.social,
          }}
        />

        <Input
          id='description'
          label={'Description for IOU'}
          name='description'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.description,
          }}
        />

        <Input
          id='keywords'
          label={'Keywords for IOU (max is 5 keys, separated by comma)'}
          name='keywords'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.keywords,
          }}
        />

        <Input
          id='unit'
          label={'Unit of measure for your product or service (f.e. hours)'}
          name='unit'
          inputProps={{
            onChange: (e) => onChangeHandler(e),
            value: values.unit,
          }}
        />
      </Box>

      <Box className={classes.actionSection}>
        <Button onClick={handleNext}>
          next 2/2
        </Button>
      </Box>
    </PageLayout>
  );
};


export default withStyles(styles, { withTheme: true })(MakeIOUToken1Page);

