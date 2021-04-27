import React from 'react';
import StakeAddLiquidityPage from './StakeAddLiquidityPage';

export default {
  title: 'Pages/StakeAddLiquidityPage',
  component: StakeAddLiquidityPage,
};

const Template = (args) => <StakeAddLiquidityPage {...args} />;

export const Base = Template.bind({});
Base.args = {};
