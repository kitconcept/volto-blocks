import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
});

const itemSchema = (props) => {
  const { intl } = props;

  return {
    title: 'Item',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['href', 'title', 'description', 'preview_image'],
      },
    ],

    properties: {
      href: {
        title: intl.formatMessage(messages.Source),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description', 'hasPreviewImage'],
      },
      title: {
        title: 'Title',
      },
      description: {
        title: 'Description',
      },
      preview_image: {
        title: 'Image override',
        widget: 'object_browser',
        mode: 'image',
      },
    },
    required: [],
  };
};

export const carouselSchema = (props) => ({
  title: 'Carousel',
  block: 'carousel',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['columns'],
    },
    {
      id: 'settings',
      title: 'Settings',
      fields: ['headline', 'items_to_show', 'hide_description'],
    },
  ],
  properties: {
    columns: {
      widget: 'object_list',
      title: 'items',
      schema: itemSchema,
    },
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
