import React from 'react';
import BuyIOUSelectPage from './BuyIOUSelectPage';

export default {
  title: 'Pages/BuyIOUSelectPage',
  component: BuyIOUSelectPage,
};

const Template = (args) => <BuyIOUSelectPage {...args} />;

export const Base = Template.bind({});
Base.args = {};
