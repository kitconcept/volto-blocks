import React from 'react';
import PropTypes from 'prop-types';
import { SchemaRenderer } from '../../components';
import { TextBodySchema } from './schema';

const TextPillData = (props) => {
  const { block, data, onChangeBlock, schemaEnhancer } = props;
  const schema = schemaEnhancer
    ? schemaEnhancer(TextBodySchema(props), props)
    : null;

  return (
    <>
      <SchemaRenderer
        schema={schema}
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
      />
    </>
  );
};

TextPillData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default TextPillData;
