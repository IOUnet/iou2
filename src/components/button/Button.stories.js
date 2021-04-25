import React from 'react';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => <div style={{ margin: '3rem' }}><Story/></div>,
  ],
  argTypes: {
    color: {
      control: {
        type: 'radio',
        options: ['primary', 'secondary']
      }
    },
    onClick: {
      action: 'clicked',
    },
  },
  args: {
    children: 'button',
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Primary.args,
  disabled: true,
};
