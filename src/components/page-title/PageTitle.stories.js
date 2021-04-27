import React from 'react';
import PageTitle from './PageTitle';

export default {
  title: 'Components/PageTitle',
  component: PageTitle,
  decorators: [
    (Story) => <div style={{ margin: '3rem' }}><Story/></div>,
  ],
};

const Template = (args) => <PageTitle {...args} />;

export const Base = Template.bind({});
Base.args = {
  children: 'children',
};
