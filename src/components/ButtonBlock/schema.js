import { defineMessages } from 'react-intl';

const messages = defineMessages({
  ButtonBlock: {
    id: 'ButtonBlock',
    defaultMessage: 'Button Block',
  },
  ButtonTitle: {
    id: 'Button Title',
    defaultMessage: 'Button Title',
  },
  ButtonLink: {
    id: 'Button Link',
    defaultMessage: 'Button Link',
  },
  Align: {
    id: 'Align Button',
    defaultMessage: 'Button Alignment',
  },
});

export const ButtonSchema = (props) => ({
  title: props.intl.formatMessage(messages.ButtonBlock),
  block: 'buttonBlock',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'href', 'align'],
    },
  ],

  properties: {
    title: {
      title: props.intl.formatMessage(messages.ButtonTitle),
    },
    href: {
      title: props.intl.formatMessage(messages.ButtonLink),
      widget: 'object_browser',
      mode: 'link',
      selectedItemAttrs: ['Title', 'Description', 'hasPreviewImage'],
      allowExternals: true,
    },
    align: {
      title: props.intl.formatMessage(messages.Align),
      widget: 'align',
    },
  },
  required: [],
});
