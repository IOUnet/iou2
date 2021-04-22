import React from 'react';
import HomePage from './HomePage';

export default {
  title: 'Pages/HomePage',
  component: HomePage,
};

const Template = (args) => <HomePage {...args} />;

export const Base = Template.bind({});
Base.args = {};
