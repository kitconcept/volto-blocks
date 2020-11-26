import React from 'react';
import { SchemaRenderer } from '@kitconcept/volto-blocks/components';
import { blocks } from '~/config';

const VariationsSchemaExtender = (props) => {
  const { block, data, onChangeBlock } = props;

  const variations = blocks?.blocksConfig?.[data['@type']]?.variations;

  const schema = variations?.[data?.variation]?.['schemaExtender'];

  return (
    <>
      {variations && data.variation && schema && (
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
        />
      )}
    </>
  );
};

export default VariationsSchemaExtender;
