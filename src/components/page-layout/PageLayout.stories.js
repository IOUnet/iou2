import React from 'react';
import PageLayout from './PageLayout';

export default {
  title: 'Components/PageLayout',
  component: PageLayout,
};

const Template = (args) => <PageLayout {...args} />;

export const Base = Template.bind({});
Base.args = {};

export const WithChildren = Template.bind({});
WithChildren.args = {
  children: 'children',
};
