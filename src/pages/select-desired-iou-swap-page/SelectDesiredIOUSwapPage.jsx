import { Box, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/page-layout/PageLayout';
import PageTitle from '../../components/page-title/PageTitle';
import TextField from '../../components/textfield/TextField';
import Checkbox from '../../components/checkbox/Checkbox';
import Button from '../../components/button/Button';
import { ROUTES } from '../../constants';
import styles from './styles';

const SelectDesiredIOUSwapPage = ({ classes }) => {
  const history = useHistory();
  const [keyword, setKeyword] = useState('select desired IOU swap');
  const [search, setSearch] = useState(false);

  const handleFind = () => {
    history.push(ROUTES.swapSelectDesiredToken);
  };

  const checkboxLabelText = 'Search in location';

  return (
    <PageLayout>
      <Box className={classes.pageTitle}>
        <PageTitle>Find desired IOU</PageTitle>
      </Box>

      <Box className={classes.controlsSection}>
        <TextField
          className={classes.textField_green}
          id={'Keyword'}
          label={'Keyword'}
          onChange={(event) => setKeyword(event.target.value)}
          value={keyword}
        />

        <Checkbox
          checked={search}
          id={checkboxLabelText}
          label={
            <Typography className={classes.checkbox_label}>{checkboxLabelText}</Typography>
          }
          onChange={(evt) => setSearch(evt.target.checked)}
        />

        <TextField
          className={classes.textField_italic}
          id={'Country'}
          label={'Country'}
          // onChange={(event) => setKeyword(event.target.value)}
          // value={keyword}
        />

        <TextField
          id={'State/Region'}
          label={'State/Region'}
          // onChange={(event) => setKeyword(event.target.value)}
          // value={keyword}
        />

        <TextField
          id={'City/Town'}
          label={'City/Town'}
          // onChange={(event) => setKeyword(event.target.value)}
          // value={keyword}
        />
      </Box>

      <Box className={classes.actionSection}>
        <Button onClick={handleFind}>
          find iou
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(SelectDesiredIOUSwapPage);
