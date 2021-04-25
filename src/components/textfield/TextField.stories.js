import React from 'react';
import TextField from './TextField';

export default {
  title: 'Components/TextField',
  component: TextField,
  decorators: [
    (Story) => <div style={{ margin: '3rem' }}><Story/></div>,
  ],
  argTypes: {
    onChange: {
      action: 'TextField value changed',
    },
  },
  args: {
    label: 'TextField Label',
  },
};

const Template = (args) => (<TextField {...args} />);

export const Base = Template.bind({});
Base.args = {
  id: 'base',
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'Disabled',
  disabled: true,
};

export const Multiline = Template.bind({});
Multiline.args = {
  id: 'Multiline',
  multiline: true,
  rows: 2,
  rowsMax: 5,
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  id: 'WithHelperText',
  helperText: 'helperText',
};

export const IfError = Template.bind({});
IfError.args = {
  id: 'IfError',
  error: true,
};
