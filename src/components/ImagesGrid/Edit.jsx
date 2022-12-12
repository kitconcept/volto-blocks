import React from 'react';
import EditGrid from '../Grid/Edit';
import templates from './templates';
import ImageBody from './ImageBody';
import ImageData from './ImageData';
import config from '@plone/volto/registry';

const Edit = (props) => {
  const variations =
    config.blocks?.blocksConfig?.[props.data['@type']]?.variations;
  const maxItemsAllowed =
    (variations && variations?.[props.data.variation]?.maxItemsAllowed) ||
    config.blocks?.blocksConfig?.[props.data['@type']]?.maxItemsAllowed ||
    4;
  const itemFixedWidth =
    (variations && variations?.[props.data.variation]?.itemFixedWidth) ||
    config.blocks?.blocksConfig?.[props.data['@type']]?.itemFixedWidth ||
    null;

  return (
    <EditGrid
      {...props}
      gridType="image"
      templates={templates}
      maxItemsAllowed={maxItemsAllowed}
      itemFixedWidth={itemFixedWidth}
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
