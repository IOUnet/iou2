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
import useFindIOU from '../../hooks/useFindIOU';

const FindBuyIOUPage = ({ classes }) => {
  const history = useHistory();
  //const searchIOU = useContext(TokensListContext)
  const tokenList = useContext(TokensListContext)

  const [FindIOU] = useFindIOU();
  const [values, setFormValues] = useState(tokenList.values) 
  // const [searchLocation, setsearchLocation] = useState();
  //  const [searchStreet, setSearchStreet] = useState(values.searchStreet); 
  const handleFind = () => {
    history.push(ROUTES.buyIOUSelect);
    tokenList.setFormValues(values)
    FindIOU(values);
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
          id={values.searchLocation}
          label={
            <Typography className={classes.checkbox_label}>{checkboxLabelText}</Typography>
          }
          name='searchLocation'
          inputProps ={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.searchLocation,
          }}
        />

        {<TextField
          className={classes.textField_italic}
          id='country'
          label={'Country'}
          name='country'
          inputProps ={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.country,
          }}
        />}

      {<TextField
          id='region'
          label={'State/Region'}
          name='region'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.state,
          }}
        />}

      {<TextField
            id='city'
            label={'City/Town'}
            name='city'
            inputProps={{
              onChange: (e) => onChangeHandler(e) ,
              value: values.city,
            }}
        />}
      </Box>
      {<Checkbox
          checked={values.searchStreet}
          id={checkboxLabelStreet}
          label={
            <Typography className={classes.checkbox_label}>{checkboxLabelStreet}</Typography>
          }
          inputProps ={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.searchStreet,
          }}        />}
      {<TextField
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
