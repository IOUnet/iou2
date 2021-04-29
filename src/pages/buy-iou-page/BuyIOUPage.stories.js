import React from 'react';
import BuyIOUPage from './BuyIOUPage';

export default {
  title: 'Pages/BuyIOUPage',
  component: BuyIOUPage,
};

const Template = (args) => <BuyIOUPage {...args} />;

export const Base = Template.bind({});
Base.args = {};
