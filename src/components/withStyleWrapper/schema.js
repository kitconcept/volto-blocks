import { blocks } from '~/config';

export const styleWrapperSchemaEnhancer = (schema) => {
  // The incoming schema should have the key "block" for identify itself
  // and then being able to get block specific settings, like the availableColors
  const availableColors = blocks?.blocksConfig?.[schema.block]?.availableColors;

  schema.fieldsets.push({
    id: 'styling',
    title: 'Styling',
    fields: ['bg_color', 'useLargeContainer', 'useFullBackgroundContainer'],
  });

  schema.properties.bg_color = {
    widget: 'style_simple_color',
    title: 'Background color',
    availableColors,
  };
  schema.properties.useLargeContainer = {
    type: 'boolean',
    title: 'Use large width',
  };
  schema.properties.useFullBackgroundContainer = {
    type: 'boolean',
    title: 'Use full width colored background',
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
