import { blocks } from '~/config';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  bgColor: {
    id: 'Background color',
    defaultMessage: 'Background color',
  },
  useLargeContainer: {
    id: 'Use large width',
    defaultMessage: 'Use large width',
  },
  useFullBackgroundContainer: {
    id: 'Use full width colored background',
    defaultMessage: 'Use full width colored background',
  },
});

export const styleWrapperSchemaEnhancer = (block, intl) => (schema) => {
  const availableColors = blocks?.blocksConfig?.[block]?.availableColors;

  schema.fieldsets.push({
    id: 'styling',
    title: 'Styling',
    fields: ['bg_color', 'useFullBackgroundContainer'],
    //'useLargeContainer'
  });

  schema.properties.bg_color = {
    widget: 'style_simple_color',
    title: intl.formatMessage(messages.bgColor),
    availableColors,
  };
  schema.properties.useLargeContainer = {
    type: 'boolean',
    title: intl.formatMessage(messages.useLargeContainer),
  };
  schema.properties.useFullBackgroundContainer = {
    type: 'boolean',
    title: intl.formatMessage(messages.useFullBackgroundContainer),
  };
  return schema;
};

export const nullSchema = () => ({
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [],
    },
  ],
  properties: {},
  required: [],
});
