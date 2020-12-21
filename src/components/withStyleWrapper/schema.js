import { blocks } from '~/config';

export const styleWrapperSchemaEnhancer = (schema) => {
  // The incoming schema should have the key "block" for identify itself
  // and then being able to get block specific settings, like the availableColors
  const availableColors = blocks?.blocksConfig?.[schema.block]?.availableColors;

  schema.fieldsets.push({
    id: 'styling',
    title: 'Styling',
    fields: ['bg_color', 'useBigContainer', 'useFullBackgroundContainer'],
  });

  schema.properties.bg_color = {
    widget: 'style_simple_color',
    title: 'Bg color',
    availableColors,
  };
  schema.properties.useBigContainer = {
    type: 'boolean',
    title: 'Use big container',
  };
  schema.properties.useFullBackgroundContainer = {
    type: 'boolean',
    title: 'Use full background container',
  };
  return schema;
};
