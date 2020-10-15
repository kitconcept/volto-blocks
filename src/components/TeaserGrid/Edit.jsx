import React from 'react';
import EditGrid from '../Grid/Edit';
import TeaserBody from './TeaserBody';
import TeaserData from './TeaserData';
import templates from './templates';

const Edit = (props) => {
  return (
    <EditGrid
      {...props}
      gridType="teaser"
      templates={templates}
      render={(item, index, onChangeGridItem) => (
        <TeaserBody
          data={item}
          isEditMode
          index={index}
          onChangeGridItem={onChangeGridItem}
        />
      )}
      sidebarData={(props, column, index) => (
        <TeaserData {...props} data={{ ...column, index }} />
      )}
    />
  );
};

export default Edit;
