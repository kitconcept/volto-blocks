export const styleWrapperSchemaEnhancer = (schema) => {
  schema.fieldsets.push({
    id: 'styling',
    title: 'Styling',
    fields: ['bg_color', 'useBigContainer', 'useFullBackgroundContainer'],
  });

  schema.properties.bg_color = {
    widget: 'style_simple_color',
    title: 'Bg color',
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
