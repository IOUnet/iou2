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

const FindBuyIOUPage = ({ classes }) => {
  const history = useHistory();
  const searchIOU = useContext(TokensListContext)

  const [keyword, setKeyword] = useState('enter keyword...');
  const [searchGeo, setSearchGeo] = useState(false);
  const [searchStreet, setSearchStreet] = useState(false);
  const tokenList = useContext(TokensListContext)
  const [values, setFormValues] = useState(tokenList.values) 

  const handleFind = () => {
    history.push(ROUTES.buyIOUSelect);
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
          id={'Keyword'}
          label={'Keyword'}
          inputProps ={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.keyword,
          }}
        />

        <Checkbox
          checked={searchGeo}
          id={checkboxLabelText}
          label={
            <Typography className={classes.checkbox_label}>{checkboxLabelText}</Typography>
          }
          inputProps ={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.searchGeo,
          }}
        />

        {searchGeo&&<TextField
          className={classes.textField_italic}
          id='country'
          label={'Country'}
          name='country'
          inputProps ={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.country,
          }}
        />}

      {searchGeo&&<TextField
          id='region'
          label={'State/Region'}
          name='region'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.state,
          }}
        />}

      {searchGeo&&<TextField
            id='city'
            label={'City/Town'}
            name='city'
            inputProps={{
              onChange: (e) => onChangeHandler(e) ,
              value: values.city,
            }}
        />}
      </Box>
      {searchGeo&&<Checkbox
          checked={searchStreet}
          id={checkboxLabelStreet}
          label={
            <Typography className={classes.checkbox_label}>{checkboxLabelStreet}</Typography>
          }
          inputProps ={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.searchStreet,
          }}        />}
      {searchGeo&&searchStreet&&<TextField
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
