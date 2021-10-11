import config from '@plone/volto/registry';
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
  const availableColors = config.blocks?.blocksConfig?.[block]?.availableColors;
  const defaultColor =
    config.blocks?.blocksConfig?.[block]?.defaultColor || null;

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
    defaultColor,
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

export const styleWrapperSchemaEnhancerV13 = ({ schema, formData, intl }) => {
  const availableColors =
    config.blocks?.blocksConfig?.[formData['@type']]?.availableColors;
  const defaultColor =
    config.blocks?.blocksConfig?.[formData['@type']]?.defaultColor;

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
    defaultColor,
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
