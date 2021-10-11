import { defineMessages } from 'react-intl';

const messages = defineMessages({
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
});

export default function schemaEnhancer({ schema, formData, intl }) {
  // debugger
  schema.required = [];
  schema.properties.right_arrows.default = true;
  schema.properties.collapsed.default = false;
  schema.properties.non_exclusive.default = false;
  schema.fieldsets[0].fields.push('headline');
  schema.properties.headline = {
    title: intl.formatMessage(messages.headline),
  };
  return schema;
}
