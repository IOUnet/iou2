import React from 'react';
import TokenCardsEdit from './TokenCardsEdit';
import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

export default {
  title: 'Components/TokenCardsList',
  component: TokenCardsEdit,
  decorators: [
    (Story) => <div style={{ margin: '0.5rem' }}><Story/></div>,
  ],
  argTypes: {
    onClick: {
      action: 'clicked',
    },
  },
  args: {
    title: 'Select IOU to payoff',
    disabledId: 'id3',
    selectedId: 'id2',
  },
};

const Template = (args) => <TokenCardsEdit {...args} />;

export const Base = Template.bind({});
Base.args = {
  data: cardListData,
};

export const Empty = Template.bind({});
Empty.args = {
  data: [],
};
