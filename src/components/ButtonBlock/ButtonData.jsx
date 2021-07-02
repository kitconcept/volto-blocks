import React from 'react';
import { ButtonSchema } from './schema';
import { BlockDataForm } from '@plone/volto/components';
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
    <BlockDataForm
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
