import { Box, withStyles } from '@material-ui/core';
import React, { useState, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { ROUTES } from '../../constants';
import styles from './styles';
import CreateIOUContext from '../../context/CreateIOUContext'




const MakeIOUToken1Page = (props) => {
  const classes = props.classes;
  const history = useHistory();
  
  const createIOU = useContext(CreateIOUContext)
  const [values, setFormValues] = useState(createIOU.values)
  const onChangeHandler = useCallback(
    (e) => {
      if (e.target.id === "keywords") {
        setFormValues(values => ({...values, [e.target.id]:e.target.value.split(',')}))
      } else {
        setFormValues(values => ({...values, [e.target.id]:e.target.value}))
      }
      
    }, [],
  );
  const handleNext = () => {
    history.push(ROUTES.makeIOUToken2);
    createIOU.setFormValues(values)
  };

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Make new IOU: Description</PageTitle>
      </Box>

      <Box className={classes.dataSection}>
        <Input 
          id='name'
          label={'ERC20 token name (12 char) ENTER CAREFULLY! This field can\'t be changed!'}
          name="name"
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.name,
          }}
        />

        <Input
          id='symbol'
          label={'ERC20 token symbol (4 char) ENTER CAREFULLY! This field can\'t be changed!'}
          name='symbol'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.symbol,
          }}
        />

        <Input
          id='username'
          label={'You name, surname (up to 255 chr) ENTER CAREFULLY! This field can\'t be changed!'}
          name='username'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.username,
          }}
        />

        <Input
          id='social'
          label={'Your profile in social networks ENTER CAREFULLY! This field can\'t be changed!' }
          name='social'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.social,
          }}
        />

        <Input
          id='description'
          label={'Description for IOU (you can change this later)'}
          name='description'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.description,
          }}
        />

        <Input
          id='keywords'
          label={'Keywords for IOU (max is 5 keys, separated by comma, you can change this later)'}
          name='keywords'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.keywords,
          }}
        />

        <Input
          id='unit'
          label={'Unit of measure for your product or service (f.e. hours) ENTER CAREFULLY! This field can\'t be changed!'}
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

