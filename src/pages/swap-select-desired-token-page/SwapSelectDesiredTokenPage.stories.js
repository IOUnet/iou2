import React from 'react';
import SwapSelectDesiredTokenPage from './SwapSelectDesiredTokenPage';

export default {
  title: 'Pages/SwapSelectDesiredTokenPage',
  component: SwapSelectDesiredTokenPage,
};

const Template = (args) => <SwapSelectDesiredTokenPage {...args} />;

export const Base = Template.bind({});
Base.args = {};
