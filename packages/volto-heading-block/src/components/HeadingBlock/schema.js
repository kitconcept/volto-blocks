import { defineMessages } from 'react-intl';

const messages = defineMessages({
  heading: {
    id: 'Heading',
    defaultMessage: 'Heading',
  },
  headingLevel: {
    id: 'Heading level',
    defaultMessage: 'Heading level',
  },
  alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
});

export const headingSchema = (props) => ({
  title: props.intl.formatMessage(messages.heading),
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['tag', 'alignment'],
    },
  ],

  properties: {
    tag: {
      title: props.intl.formatMessage(messages.headingLevel),
      choices: [
        ['h2', 'h2'],
        ['h3', 'h3'],
        ['h4', 'h4'],
        ['h5', 'h5'],
        ['h6', 'h6'],
      ],
    },
    alignment: {
      title: props.intl.formatMessage(messages.alignment),
      choices: [
        ['left', 'left'],
        ['center', 'center'],
        ['right', 'right'],
      ],
      default: ['left', 'left'],
    },
  },
  required: [],
});
