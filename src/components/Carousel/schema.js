import { defineMessages } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';

import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
});

const itemSchema = (props) => {
  const { data, intl, onChangeBlock, openObjectBrowser } = props;

  return {
    title: 'Item',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['href2', 'proxy'],
      },
    ],

    properties: {
      href2: {
        title: intl.formatMessage(messages.Source),
        widget: 'object_browser2',
      },
      proxy: {
        title: 'proxy',
      },
      href: {
        title: intl.formatMessage(messages.Source),
        icon: data.href ? clearSVG : navTreeSVG,
        iconAction: data.href
          ? () => {
              onChangeBlock(data.block, {
                ...props.data,
                href: '',
                title: '',
                description: '',
                preview_image: '',
              });
            }
          : () => openObjectBrowser({ mode: 'link' }),
      },
    },
    required: [],
  };
};

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
      widget: 'object_list',
      title: 'items',
      schema: itemSchema,
    },
  },
  required: [],
});
