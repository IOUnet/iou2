import React from 'react';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  decorators: [
    (Story) => <div style={{ margin: '3rem' }}><Story/></div>,
  ],
  argTypes: {
    onChange: {
      action: 'input value changed',
    },
  },
  args: {
    label: 'Label',
  },
};

const Template = (args) => (<Input {...args} />);

export const Base = Template.bind({});
Base.args = {
  id: 'Base',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  id: 'WithHelperText',
  helperText: 'helperText',
};

export const WithoutAutoComplete = Template.bind({});
WithoutAutoComplete.args = {
  id: 'WithoutAutoComplete',
  inputProps: {
    autoComplete: "off",
  },
};

export const Required = Template.bind({});
Required.args = {
  id: 'Required',
  required: true,
};

export const IfError = Template.bind({});
IfError.args = {
  id: 'IfError',
  error: true,
  helperText: 'errorDescription',
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'Disabled',
  disabled: true,
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  id: 'number',
  label: 'Enter number',
  inputProps: {
    type: 'number',
  },
};
