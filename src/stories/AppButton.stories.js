import React from 'react';
import AppButton from '../components/app-button/AppButton';

export default {
  title: 'Components/AppButton',
  component: AppButton,
  argTypes: {
    label: 'button',
  },
};

const Template = (args) => <AppButton {...args} />;

export const Active = Template.bind({});
Active.args = {
  label: 'give iou',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'swap iou for iou',
};
