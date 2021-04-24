import React from 'react';
import TextField from './TextField';

export default {
  title: 'Components/TextField',
  component: TextField,
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

export const VeryLongLabel = Template.bind({});
VeryLongLabel.args = {
  id: 'varyLongLabel',
  label: 'VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVery',
};
