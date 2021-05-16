import { Box, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { ROUTES } from '../../constants';
import styles from './styles';

const MakeIOUToken1Page = ({ classes }) => {
  const history = useHistory();
  const [input, setInput] = useState('Architect01');

  const handleNext = () => {
    history.push(ROUTES.makeIOUToken2);
  };

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Make new IOU: Description</PageTitle>
      </Box>

      <Box className={classes.dataSection}>
        <Input
          id={'ERC20 token name (12 char)'}
          label={'ERC20 token name (12 char)'}
          inputProps={{
            onChange: (e) => setInput(e.target.value),
            value: input,
          }}
        />

        <Input
          id={'ERC20 token symbol (4 char)'}
          label={'ERC20 token symbol (4 char)'}
          inputProps={{
            // onChange: (e) => setInput(e.target.value),
            // value: input,
            defaultValue: 'Ar01',
          }}
        />

        <Input
          id={'You name, surname (up to 255 chr)'}
          label={'You name, surname (up to 255 chr)'}
          inputProps={{
            // onChange: (e) => setInput(e.target.value),
            // value: input,
            defaultValue: 'John Johnes',
          }}
        />

        <Input
          id={'Your profile in social networks'}
          label={'Your profile in social networks'}
          inputProps={{
            // onChange: (e) => setInput(e.target.value),
            // value: input,
            defaultValue: 'www.linkedIn.com/JohnJones',
          }}
        />

        <Input
          id={'Description for IOU'}
          label={'Description for IOU'}
          inputProps={{
            // onChange: (e) => setInput(e.target.value),
            // value: input,
            defaultValue: 'software architect  15 years',
          }}
        />

        <Input
          id={'Keywords for IOU (max is 5 keys, separated by comma)'}
          label={'Keywords for IOU (max is 5 keys, separated by comma)'}
          inputProps={{
            // onChange: (e) => setInput(e.target.value),
            // value: input,
            defaultValue: 'software, architect, consulting',
          }}
        />

        <Input
          id={'Unit of measure for your product or service (f.e. hours)'}
          label={'Unit of measure for your product or service (f.e. hours)'}
          inputProps={{
            // onChange: (e) => setInput(e.target.value),
            // value: input,
            defaultValue: 'hours',
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
