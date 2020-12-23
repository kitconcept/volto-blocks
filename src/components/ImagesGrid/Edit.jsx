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
          dataGrid={props.data} // This allows to access the full data from the items
        />
      )}
      sidebarData={(props, column, index) => (
        <ImageData
          {...props}
          data={{ ...column, index }}
          dataGrid={props.data} // This allows to access the full data from the items
        />
      )}
    />
  );
};

export default Edit;
