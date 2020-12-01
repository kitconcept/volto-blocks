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

export const carouselSchema = (props) => ({
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
