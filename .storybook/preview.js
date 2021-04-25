import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';

const customViewports = {
  'iou-mobile': {
    name: 'iou-mobile',
    styles: {
      width: '376px',
      height: '640px',
    },
    type: 'mobile',
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...customViewports,
    },
    defaultViewport: 'iou-mobile',
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <div style={{ minWidth: '360px', margin: '0 auto' }}>
        <Story />
      </div>
    </ThemeProvider>
  ),
];
