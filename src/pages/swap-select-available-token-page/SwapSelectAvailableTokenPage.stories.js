import React from 'react';
import SwapSelectAvailableTokenPage from './SwapSelectAvailableTokenPage';

export default {
  title: 'Pages/SwapSelectAvailableTokenPage',
  component: SwapSelectAvailableTokenPage,
};

const Template = (args) => <SwapSelectAvailableTokenPage {...args} />;

export const Base = Template.bind({});
Base.args = {};
