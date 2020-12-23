import { defineMessages } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';

import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  Image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  Origin: {
    id: 'Origin',
    defaultMessage: 'Origin',
  },
  AltText: {
    id: 'Alt text',
    defaultMessage: 'Alt text',
  },
  Align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
  NoImageSelected: {
    id: 'No image selected',
    defaultMessage: 'No image selected',
  },
  externalURL: {
    id: 'External URL',
    defaultMessage: 'External URL',
  },
});

export function ImagesGridSchema(props) {
  const { data, intl, onChangeBlock, openObjectBrowser } = props;

  return {
    block: 'imagesGrid',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'url',
          ...(data.url ? ['title', 'alt', 'href', 'openLinkInNewTab'] : []),
        ],
      },
    ],
    properties: {
      url: {
        title: intl.formatMessage(messages.Source),
        icon: data.url ? clearSVG : navTreeSVG,
        value: data.url ? flattenToAppURL(data.url) : '',
        iconAction: data.url
          ? () => {
              onChangeBlock(data.block, {
                ...data,
                url: '',
              });
            }
          : () => openObjectBrowser(),
      },
      title: {
        title: intl.formatMessage(messages.title),
        icon: data.title && clearSVG,
        iconAction: () =>
          onChangeBlock(data.block, {
            ...data,
            title: '',
          }),
      },
      alt: {
        title: intl.formatMessage(messages.AltText),
        icon: data.alt && clearSVG,
        iconAction: () =>
          onChangeBlock(data.block, {
            ...data,
            alt: '',
          }),
      },
      href: {
        title: intl.formatMessage(messages.LinkTo),
        icon: data.href ? clearSVG : navTreeSVG,
        iconAction: data.href
          ? () => {
              onChangeBlock(data.block, {
                ...data,
                href: '',
              });
            }
          : () => openObjectBrowser({ mode: 'link' }),
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
