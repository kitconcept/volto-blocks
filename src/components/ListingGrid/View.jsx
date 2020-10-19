import React from 'react';
import {
  GridViewBlock as ViewGrid,
  ListingGridBody,
} from '@kitconcept/volto-blocks/components';

const View = (props) => {
  return (
    <ViewGrid
      {...props}
      render={(column, path, columns) => (
        <ListingGridBody data={column} path={path} columns={columns} />
      )}
    />
  );
};

export default View;
