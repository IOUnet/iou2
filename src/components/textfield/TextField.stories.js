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
