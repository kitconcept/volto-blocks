import React from 'react';
import {
  GridEditBlock as EditGrid,
  TeaserBody,
  TeaserData,
} from '@kitconcept/volto-blocks/components';

import templates from './templates';

const Edit = (props) => {
  return (
    <EditGrid
      {...props}
      gridType="teaser"
      templates={templates}
      render={({ item, index, onChangeGridItem }) => (
        <TeaserBody
          data={item}
          isEditMode
          index={index}
          onChangeGridItem={onChangeGridItem}
        />
      )}
      sidebarData={(props, column, index) => (
        <TeaserData
          {...props}
          data={{ ...column, index }}
          dataGrid={props.data} // This allows to access the full data from the items
        />
      )}
    />
  );
};

export default Edit;
