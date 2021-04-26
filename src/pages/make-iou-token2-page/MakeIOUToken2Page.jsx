import { Box, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import styles from './styles';

const MakeIOUToken2Page = ({ classes }) => {
  const [input, setInput] = useState('India');

  return (
    <PageLayout>
      <Box className={classes.descriptionSection}>
        <Typography className={classes.title} variant="subtitle1">
          Make new IOU: Address
        </Typography>

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
        <Button onClick={() => console.log('button clicked')}>
          next 1/2
        </Button>
        <Button onClick={() => console.log('button clicked')}>
          publish iou
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(MakeIOUToken2Page);
