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
import useCreateIOU from '../../hooks/useCreateIOU'

const MakeIOUToken2Page = ({ classes }) => {
  const history = useHistory();
 // const getContractInstance = (current_state) => getContract(current_state, 'MakeIOU', '@makeiou')
  const createIOU = useContext(CreateIOUContext)
  const [values, setFormValues] = useState(createIOU.values) 
  const [approved, createIOUInContract] = useCreateIOU()
  const onChangeHandler = useCallback(
    (e) => {
      setFormValues(values => ({...values, [e.target.id]:e.target.value}))
    }, [],
  );
  const handlePrev = () => {
    history.push(ROUTES.makeIOUToken1);
    createIOU.setFormValues(values)

  };

  const handlePublish = () => {
    history.push(ROUTES.mintSelectToken);
    createIOUInContract(values)
  };

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Edit IOU Talimtoken:Phone</PageTitle>
      </Box>

      <Box className={classes.dataSection}>
    

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
        <Button onClick={handlePrev}>
          prev 1/2
        </Button>
        <Button onClick={handlePublish}>
          publish iou
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(MakeIOUToken2Page);
