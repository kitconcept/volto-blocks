import { defineMessages } from 'react-intl';

const messages = defineMessages({
  HeadlineBlock: {
    id: 'HeadlineBlock',
    defaultMessage: 'Headline Block',
  },
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
});

export const HeadlineSchema = (props) => ({
  title: props.intl.formatMessage(messages.HeadlineBlock),
  block: 'headline',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title'],
    },
  ],

  properties: {
    title: {
      title: props.intl.formatMessage(messages.headline),
    },
  },
  required: [],
});
