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
// config.widgets.widget.object = ObjectWidget;
// config.widgets.widget.object_list = ObjectListWidget;
// config.widgets.widget.object_list_inline = ObjectListInlineWidget;
// config.widgets.widget.object_by_type = ObjectByTypeWidget;
// config.widgets.widget.option_mapping = MappingWidget;
