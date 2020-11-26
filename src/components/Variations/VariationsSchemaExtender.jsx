import React from 'react';
import { SchemaRenderer } from '@kitconcept/volto-blocks/components';
import { blocks } from '~/config';

const VariationsSchemaExtender = (props) => {
  const {
    block,
    data,
    dataGrid,
    schemaKey = 'schemaExtender',
    onChangeBlock,
  } = props;

  const variations =
    blocks?.blocksConfig?.[data['@type']]?.variations ||
    blocks?.blocksConfig?.[dataGrid['@type']]?.variations;

  const schema =
    variations?.[data?.variation]?.[schemaKey] ||
    variations?.[dataGrid?.variation]?.[schemaKey];

  return (
    <>
      {variations && (data.variation || dataGrid.variation) && schema && (
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
