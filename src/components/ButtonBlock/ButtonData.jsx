import React from 'react';
import { SchemaRenderer } from '@kitconcept/volto-blocks/components';
import { ButtonSchema } from './schema';
import { useIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  ButtonBlock: {
    id: 'ButtonBlock',
    defaultMessage: 'Button Block',
  },
});

const ButtonData = (props) => {
  const { data, block, onChangeBlock, schemaEnhancer } = props;
  const intl = useIntl();
  const schema = schemaEnhancer
    ? schemaEnhancer(ButtonSchema({ ...props, intl }), props)
    : null;

  return (
    <SchemaRenderer
      schema={schema}
      title={intl.formatMessage(messages.ButtonBlock)}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
      fieldIndex={data.index}
      block={block}
    />
  );
};

export default ButtonData;
