import React from 'react';
import { CheckboxWidget, TextWidget } from '@plone/volto/components';
import {
  GridEditBlock as EditGrid,
  ListingGridBody,
  ListingGridData,
} from '@kitconcept/volto-blocks/components';
import templates from './templates';

const Edit = (props) => {
  return (
    <EditGrid
      {...props}
      gridType="listing"
      templates={templates}
      render={({ item, index, path, columns }) => {
        return (
          <ListingGridBody
            data={item}
            isEditMode
            index={index}
            path={path}
            columns={columns}
          />
        );
      }}
      sidebarData={(props, column, index) => (
        <ListingGridData {...props} data={{ ...column, index }} />
      )}
    />
  );
};

export default Edit;
