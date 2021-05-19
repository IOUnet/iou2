import { Box, withStyles } from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { ROUTES } from '../../constants';
import styles from './styles';
import { useDispatch, useSelector,useStore } from 'react-redux';
import { SAVE_PAGE_TWO_MAKE_IOU, MAKE_IOU_TOKEN } from '../../ethvtx_config/actions/types';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';

const MakeIOUToken2Page = ({ classes }) => {
  const history = useHistory();
  const current_state = useStore();
 // const getContractInstance = (current_state) => getContract(current_state, 'MakeIOU', '@makeiou')
  const makeIOUContract = useSelector(state => getContract(current_state, 'MakeIOU', '@makeiou'))
  const [values, setFormValues] = useState({}) 
  const dispatch = useDispatch()
  const onChangeHandler = useCallback(
    (e) => {
      setFormValues(values => ({...values, [e.target.id]:e.target.value}))
    }, [],
  );
  const handleNext = () => {
    history.push(ROUTES.makeIOUToken1);
    dispatch({type: SAVE_PAGE_TWO_MAKE_IOU, payload: values})
  };

  const handlePublish = () => {
    dispatch({type:MAKE_IOU_TOKEN,payload:{contract:makeIOUContract, data:values}})
    history.push(ROUTES.mintSelectToken);
  };

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Make new IOU: Address</PageTitle>
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

        <Input
          id='phone'
          label={'Phone'}
          name='phone'
          inputProps={{
            onChange: (e) => onChangeHandler(e) ,
            value: values.phone,
          }}
        />
      </Box>

      <Box className={classes.actionSection}>
        <Button onClick={handleNext}>
          next 1/2
        </Button>
        <Button onClick={handlePublish}>
          publish iou
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(MakeIOUToken2Page);
