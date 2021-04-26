import React from 'react';
import StakeAddPairPage from './StakeAddPairPage';

export default {
  title: 'Pages/StakeAddPairPage',
  component: StakeAddPairPage,
};

const Template = (args) => <StakeAddPairPage {...args} />;

export const Base = Template.bind({});
Base.args = {};
