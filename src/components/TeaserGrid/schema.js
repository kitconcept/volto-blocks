import { defineMessages } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';

import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  SourceImage: {
    id: 'Source image',
    defaultMessage: 'Source image',
  },
  Headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
});

export function TeaserGridSchema(props) {
  const { block, data, intl, onChangeBlock, openObjectBrowser } = props;

  return {
    block: 'teaserGrid',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'href',
          ...(data.href
            ? ['title', 'description', 'preview_image', 'openLinkInNewTab']
            : []),
        ],
      },
    ],
    properties: {
      href: {
        title: intl.formatMessage(messages.Source),
        icon: data.href ? clearSVG : navTreeSVG,
        iconAction: data.href
          ? () => {
              onChangeBlock(block, {
                ...data,
                href: '',
                title: '',
                description: '',
                preview_image: '',
              });
            }
          : () => openObjectBrowser({ mode: 'link' }),
        value: data.href && flattenToAppURL(data.href),
      },
      title: {
        title: intl.formatMessage(messages.title),
        icon: data.title && clearSVG,
        iconAction: () =>
          onChangeBlock(block, {
            ...data,
            title: '',
          }),
      },
      description: {
        title: intl.formatMessage(messages.description),
        widget: 'textarea',
      },
      preview_image: {
        title: intl.formatMessage(messages.SourceImage),
        icon: data.preview_image ? clearSVG : navTreeSVG,
        value: data.preview_image
          ? data.preview_image?.filename
            ? flattenToAppURL(data.preview_image.filename)
            : flattenToAppURL(data.preview_image)
          : '',
        iconAction: data.preview_image
          ? () => {
              onChangeBlock(block, {
                ...data,
                preview_image: '',
              });
            }
          : () =>
              openObjectBrowser({
                onSelectItem: (url) => {
                  onChangeBlock(block, {
                    ...data,
                    preview_image: url,
                  });
                },
              }),
      },
      openLinkInNewTab: {
        title: intl.formatMessage(messages.openLinkInNewTab),
        type: 'boolean',
        value: data.openLinkInNewTab ? data.openLinkInNewTab : false,
      },
    },
    required: [],
  };
}
