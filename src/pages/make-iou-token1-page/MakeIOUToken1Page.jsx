import { Box, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import styles from './styles';

const MakeIOUToken1Page = ({ classes }) => {
  const [input, setInput] = useState('Architect01');

  return (
    <PageLayout>
      <Box className={classes.descriptionSection}>
        <Typography className={classes.title} variant="subtitle1">
          Make new IOU: Description
        </Typography>

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
        <Button onClick={() => console.log('button clicked')}>
          next 2/2
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(MakeIOUToken1Page);
