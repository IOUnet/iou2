import React from 'react';
import TokenCard from './TokenCard';
import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

export default {
  title: 'Components/TokenCard',
  component: TokenCard,
  decorators: [
    (Story) => <div style={{ margin: '3rem 0.5rem' }}><Story/></div>,
  ],
};

const Template = (args) => <TokenCard {...args} />;

export const Base = Template.bind({});
Base.args = {
  data: cardListData[0],
};

export const SomeDataFalsy1 = Template.bind({});
SomeDataFalsy1.args = {
  data: {
    ...Base.args.data,
    count: null,
    address: '',
    units: '',
  },
};

export const SomeDataFalsy2 = Template.bind({});
SomeDataFalsy2.args = {
  isFullMode: false,
  data: {
    ...Base.args.data,
    count: 2,
    units: '',
  },
};
