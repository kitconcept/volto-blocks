import React from 'react';
import EditGrid from '../Grid/Edit';
import TeaserBody from './TeaserBody';
import TeaserData from './TeaserData';
import templates from './templates';
import InlineForm from '../InlineForm';
import schema from './schema';
import { replaceItemOfArray } from '@kitconcept/volto-blocks/helpers';

const Edit = props => {
  const { onChangeBlock, block, data } = props;
  return (
    <>
      {/* <EditGrid */}
      {/*   {...props} */}
      {/*   gridType="teaser" */}
      {/*   templates={templates} */}
      {/*   render={(item, index) => ( */}
      {/*     <TeaserBody data={item} isEditMode index={index} /> */}
      {/*   )} */}
      {/*   sidebarData={(props, column, index) => ( */}
      {/*     <TeaserData {...props} data={{ ...column, index }} /> */}
      {/*   )} */}
      {/* /> */}
      <EditGrid
        {...props}
        gridType="teaser"
        templates={templates}
        render={(item, index) => {
          return <TeaserBody data={item} isEditMode index={index} />;
        }}
        sidebarData={(props, column, index) => (
          <InlineForm
            schema={schema}
            title={schema.title}
            onChangeField={(id, value) => {
              const { columns } = data;
              onChangeBlock(block, {
                ...data,
                columns: replaceItemOfArray(columns, index, {
                  ...column,
                  [id]: value,
                  href: id === 'source' ? value?.[0]?.['@id'] : column.href,
                }),
              });
            }}
            dettached={false}
            formData={column}
          />
        )}
      />
    </>
  );
};

export default Edit;
