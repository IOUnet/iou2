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
        <PageTitle>Edit IOU: Description</PageTitle>
      </Box>

      <Box className={classes.dataSection}>
     

        <Input
          id='description'
          label={'Description for IOU'}
          name='description'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.description,
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

