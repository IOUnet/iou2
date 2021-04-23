import React from 'react';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
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
  id: 'base',
};

export const VeryLongLabel = Template.bind({});
VeryLongLabel.args = {
  id: 'varyLongLabel',
  label: 'VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVery',
};
