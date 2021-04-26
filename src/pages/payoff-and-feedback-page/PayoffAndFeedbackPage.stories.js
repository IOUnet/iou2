import React from 'react';
import PayoffAndFeedbackPage from './PayoffAndFeedbackPage';

export default {
  title: 'Pages/PayoffAndFeedbackPage',
  component: PayoffAndFeedbackPage,
};

const Template = (args) => <PayoffAndFeedbackPage {...args} />;

export const Base = Template.bind({});
Base.args = {};
