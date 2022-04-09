import { Box, Typography, withStyles, RadioGroup, Radio, FormControlLabel} from '@material-ui/core';
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
import useGetIOUKeys from '../../hooks/useGetIOUKeys'
// import { FindInPageOutlined } from '@material-ui/icons';
// import useFindIOU from '../../hooks/useFindIOU';

const FindBuyIOUPage = ({ classes }) => {
  const history = useHistory();
  //const searchIOU = useContext(TokensListContext)
  const tokenList = useContext(TokensListContext)
  const [checked, setChecked] = useState([]);
  const [values, setFormValues] = useState(tokenList.values) 
  
 // const [searchLocation, setsearchLocation] = useState();
  var searchLocation, searchStreet ;
  //  const [searchStreet, setSearchStreet] = useState(values.searchStreet); 
  const handleFind = () => {
    tokenList.setFormValues(values);
    history.push(ROUTES.buyIOUSelect);
    
    
  //  findIOU(values);
  };

/*   const onChangeHandler = useCallback(
    (e) => {
      setFormValues(values => ({...values, [e.target.id]:e.target.value}))
    }, [],
  ) */;
  const onChangeHandler = useCallback(
    (e) => {
    //  values['searchLocation'] = searchLocation;
//      setFormValues(values);
      setFormValues(values => ({...values, [e.target.name]:e.target.checked}))
    }
  );
  const checkboxLabelText = 'Search IOUs in location:';
  const checkboxLabelStreet = 'Search IOUs in street:';
  const dataIOUKeys = useGetIOUKeys()
  var keywords = [];
  if (dataIOUKeys !== undefined) { 
    keywords = dataIOUKeys;
    
   } 

  const handleCheck = (e) => {
    var updatedList = [...checked];
    if (e.target.checked) {
      updatedList = [...checked, e.target.value];
    } else {
      updatedList.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(updatedList);
    setFormValues(values => ({...values, ['keyword']:e.target.value}))

  };
  var isChecked = (item) =>
  checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <PageLayout>
      <Box className={classes.selectSection}>
        <PageTitle>Find IOU with keywords:</PageTitle>
{/*         <Button onClick={showallIOUs}>
          All IOUs
        </Button> */}
      </Box>
      <Box className={classes.controlsSection}>
      <div className="checkList">
        
{/*         <div className="list-container">
 */}        <RadioGroup        
       /*  aria-labelledby="demo-radio-buttons-group-label" */
        name="radio-buttons-group">
          {keywords.map((item, index) => (
            <div key={index}>
              <FormControlLabel   
               id={'keyword'}       
               name='keyword'
                value={item} 
                type="radio" 
                control={<Radio />}
                label = {item}
                onChange={handleCheck} />
              
            </div>
          ))}
            </RadioGroup>
        {/* </div> */}
      </div>
{/*         <TextField
          className={classes.textField_green}
          id={'keyword'}
          label={'Keyword'}
          name='keyword'

          inputProps ={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.keyword,
          }}
        /> */}

        <Checkbox
          checked={values.searchLocation}
          id={'searchLocation'}
          label={
            <Typography className={classes.checkbox_label}>{checkboxLabelText}</Typography>
          }
          name='searchLocation'
          onChange  = {onChangeHandler}
 /*         onClick = {onChangeHandler}
           inputProps ={{
            onClick: (e) => onChangeHandler(e) ,
            value: values.searchLocation,
          }} */
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

      {values.searchLocation&&<TextField
          id='state'
          label={'State/Region'}
          name='state'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.state,
          }}
        />}

      {values.searchLocation&&<TextField
            id='city'
            label={'City/Town'}
            name='city'
            inputProps={{
              onChange: (e) => onChangeHandler(e) ,
              value: values.city,
            }}
        />}
      </Box>
      {values.searchLocation&&<Checkbox
          checked={values.searchStreet}
          id={checkboxLabelStreet}
          name='searchStreet'
          label={
            <Typography className={classes.checkbox_label}>{checkboxLabelStreet}</Typography>
          }
          onChange  = {onChangeHandler}
                 />}
      {values.searchLocation&&values.searchStreet&&<TextField
          id='street'
          label={'Street/Block'}
          name='street'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.street,
          }}
    />} <hr />
        <Button onClick={handleFind}>
          find
        </Button>
      
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(FindBuyIOUPage);
