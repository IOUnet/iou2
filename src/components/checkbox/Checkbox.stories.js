import React from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    labelPlacement: {
      control: {
        type: 'radio',
        options: ['start', 'end']
      }
    },
  },
  args: {
    label: 'checkbox label',
  },
};

const Template = (args) => (<Checkbox {...args} />);

export const Checked = Template.bind({});
Checked.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const LeftLabelPosition = Template.bind({});
LeftLabelPosition.args = {
  labelPlacement: "start",
};
