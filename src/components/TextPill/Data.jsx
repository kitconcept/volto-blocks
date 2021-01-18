import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { SchemaRenderer } from '../../components';
import { TextBodySchema } from './schema';

const TextPillData = (props) => {
  const { block, data, onChangeBlock, schemaEnhancer } = props;
  const intl = useIntl();
  const schema = schemaEnhancer
    ? schemaEnhancer(TextBodySchema({ ...props, intl }), props)
    : null;

  // Removing the useLargeContainer from the enhancer, since it has no sense,
  // making sure the second fieldset is the styling one.
  if (schema.fieldsets.length > 1 && schema.fieldsets[1].id === 'styling') {
    const index = schema.fieldsets[1].fields.indexOf('useLargeContainer');
    schema.fieldsets[1].fields.splice(index, 1);
  }

  // Default value for the styling useFullBackgroundContainer is true
  if (data.useFullBackgroundContainer === undefined) {
    data.useFullBackgroundContainer = true;
  }

  return (
    <>
      <SchemaRenderer
        schema={schema}
        title={schema.title}
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
