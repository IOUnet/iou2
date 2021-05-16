import { Box, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { ROUTES } from '../../constants';
import styles from './styles';

const MakeIOUToken2Page = ({ classes }) => {
  const history = useHistory();
  const [input, setInput] = useState('India');

  const handleNext = () => {
    history.push(ROUTES.makeIOUToken1);
  };

  const handlePublish = () => {
    history.push(ROUTES.mintSelectToken);
  };

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Make new IOU: Address</PageTitle>
      </Box>

      <Box className={classes.dataSection}>
        <Input
          id={'Country'}
          label={'Country'}
          inputProps={{
            onChange: (e) => setInput(e.target.value),
            value: input,
          }}
        />

        <Input
          id={'State/Region'}
          label={'State/Region'}
          inputProps={{
            // onChange: (e) => setInput(e.target.value),
            // value: input,
            defaultValue: ' Karnataka',
          }}
        />

        <Input
          id={'City/Town'}
          label={'City/Town'}
          inputProps={{
            // onChange: (e) => setInput(e.target.value),
            // value: input,
            defaultValue: 'Bengaluru',
          }}
        />

        <Input
          id={'Street/Block'}
          label={'Street/Block'}
          inputProps={{
            // onChange: (e) => setInput(e.target.value),
            // value: input,
            defaultValue: 'Bannerghatta Main Road',
          }}
        />

        <Input
          id={'Phone'}
          label={'Phone'}
          inputProps={{
            // onChange: (e) => setInput(e.target.value),
            // value: input,
            type: 'tel',
            defaultValue: '+91234567890',
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
