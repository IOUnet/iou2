import React from 'react';
import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    onClick: {
      action: 'clicked',
    },
  },
};

const Template = (args) => <Header {...args} />;

export const Base = Template.bind({});
Base.args = {};
