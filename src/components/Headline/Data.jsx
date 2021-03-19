import React from 'react';
import { SchemaRenderer } from '@kitconcept/volto-blocks/components';
import { HeadlineSchema } from './schema';
import { useIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  HeadlineBlock: {
    id: 'HeadlineBlock',
    defaultMessage: 'Headline Block',
  },
});

const HeadlineData = (props) => {
  const { data, block, onChangeBlock, schemaEnhancer } = props;
  const intl = useIntl();
  const schema = schemaEnhancer
    ? schemaEnhancer(HeadlineSchema({ ...props, intl }), props)
    : null;

  return (
    <SchemaRenderer
      schema={schema}
      title={intl.formatMessage(messages.HeadlineBlock)}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
      fieldIndex={data.index}
      basic
      unwrapped
      block={block}
    />
  );
};

export default HeadlineData;
