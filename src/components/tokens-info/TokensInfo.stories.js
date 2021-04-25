import React from 'react';
import TokensInfo from './TokensInfo';

export default {
  title: 'Components/TokensInfo',
  component: TokensInfo,
  decorators: [
    (Story) => <div style={{ marginTop: '1rem' }}><Story/></div>,
  ],
};

const Template = (args) => <TokensInfo {...args} />;

export const Base = Template.bind({});
Base.args = {
  data: {
    tokens: 7,
    issuers: 5,
    keywords: 11,
  },
};

export const SomeDataFalsy1 = Template.bind({});
SomeDataFalsy1.args = {
  data: {
    ...Base.args.data,
    issuers: 0,
    keywords: '',
  },
};

export const SomeDataFalsy2 = Template.bind({});
SomeDataFalsy2.args = {
  data: {
    ...Base.args.data,
    issuers: null,
    keywords: 0,
  },
};
