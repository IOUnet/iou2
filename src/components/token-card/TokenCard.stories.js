import React from 'react';
import TokenCard from './TokenCard';

export default {
  title: 'Components/TokenCard',
  component: TokenCard,
};

const Template = (args) => <TokenCard {...args} />;

export const Base = Template.bind({});
Base.args = {
  data: {
    title: 'SmbdIOUtoken1',
    count: 1,
    description: 'consulting in blockchain',
    keys: 'blockchain, consulting',
    address: '0x12345678ABCDF123456',
    minted: 10,
    payed: 7,
    rating: 80,
    units: 'hours',
  },
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