import React from 'react';
import MintSelectTokenPage from './MintEditTokenPage';

export default {
  title: 'Pages/MintSelectTokenPage',
  component: MintSelectTokenPage,
};

const Template = (args) => <MintSelectTokenPage {...args} />;

export const Base = Template.bind({});
Base.args = {};
