import React from 'react';
import EditGrid from '../Grid/Edit';
import ListingData from '@plone/volto/components/manage/Blocks/Listing/ListingData';
import ListingBody from './ListingBodyGrid';
import templates from './templates';

const Edit = (props) => {
  return (
    <EditGrid
      {...props}
      gridType="listing"
      templates={templates}
      render={({ item, index, path, columns }) => {
        return (
          <ListingBody
            data={item}
            isEditMode
            index={index}
            path={path}
            columns={columns}
          />
        );
      }}
      sidebarData={(props, column, index) => (
        <ListingData {...props} data={{ ...column, index }} />
      )}
    />
  );
};

export default Edit;
