import React from 'react';
import Slider from './Slider';

export default {
  title: 'Components/Slider',
  component: Slider,
  decorators: [
    (Story) => <div style={{ margin: '3rem' }}><Story/></div>,
  ],
  args: {
    title: 'Slide to rate IOU',
    defaultValue: 60,
    min: -100,
  },
};

const Template = (args) => (<Slider {...args} />);

export const Base = Template.bind({});
Base.args = {
  id: 'base',
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'Disabled',
  disabled: true,
};
