import { Box, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useCallback, useState, useContext }  from 'react';

import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TextField from '../../components/textfield/TextField';
import Checkbox from '../../components/checkbox/Checkbox';
import Button from '../../components/button/Button';
import { ROUTES } from '../../constants';
import styles from './styles';
import TokensListContext from '../../context/TokensListContext'

import { FindInPageOutlined } from '@material-ui/icons';

const FindBuyIOUPage = ({ classes }) => {
  const history = useHistory();
  //const searchIOU = useContext(TokensListContext)
  const tokenList = useContext(TokensListContext)

   
  const [values, setFormValues] = useState(tokenList.values) 
  //const [keyword, setKeyword] = useState(values.keyword);
  const [searchLocation, setsearchLocation] = useState(values.searchLocation);
  const [searchStreet, setSearchStreet] = useState(values.searchStreet); 
  const handleFind = () => {
    history.push(ROUTES.buyIOUSelect);
    tokenList.setFormValues(values)
  //  IOUAddreses(values)
  };

  const onChangeHandler = useCallback(
    (e) => {
      setFormValues(values => ({...values, [e.target.id]:e.target.value}))
    }, [],
  );
  const checkboxLabelText = 'Search IOUs in location:';
  const checkboxLabelStreet = 'Search IOUs in street:';

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Find IOU</PageTitle>
      </Box>

      <Box className={classes.controlsSection}>
        <TextField
          className={classes.textField_green}
          id={'keyword'}
          label={'Keyword'}
          name='keyword'

          inputProps ={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.keyword,
          }}
        />

        <Checkbox
          checked={values.searchLocation}
          id={checkboxLabelText}
          label={
            <Typography className={classes.checkbox_label}>{checkboxLabelText}</Typography>
          }
          inputProps ={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.searchLocation,
          }}
        />

        {values.searchLocation&&<TextField
          className={classes.textField_italic}
          id='country'
          label={'Country'}
          name='country'
          inputProps ={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.country,
          }}
        />}

      {searchLocation&&<TextField
          id='region'
          label={'State/Region'}
          name='region'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.state,
          }}
        />}

      {searchLocation&&<TextField
            id='city'
            label={'City/Town'}
            name='city'
            inputProps={{
              onChange: (e) => onChangeHandler(e) ,
              value: values.city,
            }}
        />}
      </Box>
      {searchLocation&&<Checkbox
          checked={searchStreet}
          id={checkboxLabelStreet}
          label={
            <Typography className={classes.checkbox_label}>{checkboxLabelStreet}</Typography>
          }
          inputProps ={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.searchStreet,
          }}        />}
      {searchLocation&&searchStreet&&<TextField
          id='street'
          label={'Street/Block'}
          name='street'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.street,
          }}
    />}
      <Box className={classes.actionSection}>
        <Button onClick={handleFind}>
          find
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(FindBuyIOUPage);
