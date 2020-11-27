import React from 'react';
import EditGrid from '../Grid/Edit';
import templates from './templates';
import ImageBody from './ImageBody';
import ImageData from './ImageData';

const Edit = (props) => {
  return (
    <EditGrid
      {...props}
      gridType="image"
      templates={templates}
      render={({ item, index, onChangeGridItem }) => (
        <ImageBody
          data={item}
          index={index}
          onChangeGridItem={onChangeGridItem}
          isEditMode
        />
      )}
      sidebarData={(props, column, index) => (
        <ImageData {...props} data={{ ...column, index }} />
      )}
    />
  );
};

export default Edit;
