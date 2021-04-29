import React from 'react';
import ValueInfo from './ValueInfo';

export default {
  title: 'Components/ValueInfo',
  component: ValueInfo,
  decorators: [
    (Story) => <div style={{ margin: '3rem' }}><Story/></div>,
  ],
};

const Template = (args) => <ValueInfo {...args} />;

export const Base = Template.bind({});
Base.args = {
  value: 100,
  label: 'You have IOUDollars:',
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  ...Base.args,
  label: 'You have very very very very very match IOUDollars:',
};
