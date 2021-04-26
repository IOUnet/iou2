import React from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators: [
    (Story) => <div style={{ margin: '3rem' }}><Story/></div>,
  ],
  argTypes: {
    labelPlacement: {
      control: {
        type: 'radio',
        options: ['start', 'end']
      }
    },
    onChange: {
      action: 'changed',
    },
  },
  args: {
    label: 'checkbox label',
  },
};

const Template = (args) => (<Checkbox {...args} />);

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  labelPlacement: "end",
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  checked: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Checked.args,
  disabled: true,
};

export const LeftLabelPosition = Template.bind({});
LeftLabelPosition.args = {
  ...Checked.args,
  labelPlacement: "start",
};

export const LeftLabelPositionFullWidth = Template.bind({});
LeftLabelPositionFullWidth.args = {
  ...LeftLabelPosition.args,
  labelFullWidth: true,
};
