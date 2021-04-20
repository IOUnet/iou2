import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import AppCheckbox from '../components/app-checkbox/AppCheckbox';

export default {
  title: 'Components/AppCheckbox',
  component: AppCheckbox,
  argTypes: {
    label: 'checkbox',
  },
};

const Template = (args) => (
  <ThemeProvider theme={theme}>
    <AppCheckbox {...args} />
  </ThemeProvider>
);

export const Active = Template.bind({});
Active.args = {
  label: 'give iou',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'swap iou for iou',
};
