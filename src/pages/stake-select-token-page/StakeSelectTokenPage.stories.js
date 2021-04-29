import React from 'react';
import StakeSelectTokenPage from './StakeSelectTokenPage';

export default {
  title: 'Pages/StakeSelectTokenPage',
  component: StakeSelectTokenPage,
};

const Template = (args) => <StakeSelectTokenPage {...args} />;

export const Base = Template.bind({});
Base.args = {};
