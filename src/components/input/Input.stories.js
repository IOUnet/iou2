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
  id: 'base',
  inputProps: {
    autoComplete: "off",
  },
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  id: 'number',
  label: 'Enter number',
  inputProps: {
    type: 'number',
  },
};
