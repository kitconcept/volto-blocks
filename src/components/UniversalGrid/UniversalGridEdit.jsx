import React from 'react';
import InlineForm from '../InlineForm';
import schema from './schema';

// import EditGrid from '../Grid/Edit';
// import templates from './templates';
// import { replaceItemOfArray } from '@kitconcept/volto-blocks/helpers';

const Edit = props => {
  const { onChangeBlock, block, data } = props;
  return (
    <>
      <InlineForm
        schema={schema}
        title={schema.title}
        onChangeField={(id, value) => {
          onChangeBlock(block, {
            ...data,
            [id]: value,
          });
        }}
        dettached={true}
        formData={data}
      />
    </>
  );
};

export default Edit;
