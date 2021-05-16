import { Box, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TokenCard from '../../components/token-card/TokenCard';
import Input from '../../components/input/Input';
import Slider from '../../components/slider/Slider';
import TextField from '../../components/textfield/TextField';
import Button from '../../components/button/Button';
import { ROUTES } from '../../constants';
import styles from './styles';

import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

const PayoffAndFeedbackPage = ({ classes }) => {
  const history = useHistory();
  const [number, setNumber] = useState('');
  const [rate, setRate] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handlePayoff = () => {
    history.push(ROUTES.main);
  };

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Payoff IOU:</PageTitle>
      </Box>

      <Box className={classes.cardSection}>
        <TokenCard data={cardListData[0]} />
      </Box>

      <Box className={classes.dataSection}>
        <Box className={classes.numberInput}>
          <Input
            id={'Enter number of IOUs to payoff'}
            inputProps={{
              inputProps: { min: 0 },
              onChange: (e) => setNumber(e.target.value),
              type: "number",
              value: number,
            }}
            label={'Enter number of IOUs to payoff'}
          />
          <Typography>Units: hours</Typography>
        </Box>

        <Slider
          id={'Slide to rate IOU'}
          min={-100}
          onChange={(_, newValue) => setRate(newValue)}
          title={'Slide to rate IOU'}
          value={rate}
        />

        <TextField
          id={'Feedback'}
          label={'Feedback'}
          multiline={true}
          rowsMax={4}
          onChange={(event) => setFeedback(event.target.value)}
          value={feedback}
        />
      </Box>

      <Box className={classes.actionSection}>
        <Button onClick={handlePayoff}>
          payoff IOU
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(PayoffAndFeedbackPage);
