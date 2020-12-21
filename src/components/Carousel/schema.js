const itemSchema = (props) => ({
  title: 'Item',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title'],
    },
  ],

  properties: {
    title: {
      type: 'string',
      title: 'Title',
    },
  },
  required: [],
});

export const carouselSchemaExperimental = (props) => ({
  title: 'Carousel',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['columns'],
    },
  ],
  properties: {
    columns: {
      widget: 'object_list_inline',
      title: 'items',
      schema: itemSchema(props),
    },
  },
  required: [],
});

export const carouselSchema = (props) => ({
  title: 'Carousel',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['headline', 'items_to_show', 'hide_description'],
    },
  ],
  properties: {
    headline: {
      title: 'Headline',
    },
    items_to_show: {
      type: 'number',
      title: 'Items to show',
      defaultValue: 4,
    },
    hide_description: {
      title: 'Hide description',
      type: 'boolean',
    },
  },
  required: [],
});
