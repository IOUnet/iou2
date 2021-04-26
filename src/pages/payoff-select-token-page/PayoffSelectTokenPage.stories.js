import React from 'react';
import PayoffSelectTokenPage from './PayoffSelectTokenPage';

export default {
  title: 'Pages/PayoffSelectTokenPage',
  component: PayoffSelectTokenPage,
};

const Template = (args) => <PayoffSelectTokenPage {...args} />;

export const Base = Template.bind({});
Base.args = {};
