import { defineMessages } from 'react-intl';

const messages = defineMessages({
  TextBlockBackgroundColor: {
    id: 'Text block with background color',
    defaultMessage: 'Text block with background color',
  },
});

export const TextBodySchema = (props) => ({
  title: props.intl.formatMessage(messages.TextBlockBackgroundColor),
  block: 'textPillWithStyle',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [],
    },
  ],

  properties: {},
  required: [],
});
