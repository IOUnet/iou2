import React from 'react';
import MintSelectReceiverPage from './MintSelectReceiverPage';

export default {
  title: 'Pages/MintSelectReceiverPage',
  component: MintSelectReceiverPage,
};

const Template = (args) => <MintSelectReceiverPage {...args} />;

export const Base = Template.bind({});
Base.args = {};
