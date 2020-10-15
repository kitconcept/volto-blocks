import React from 'react';
import ViewGrid from '../Grid/View';
import ListingBody from './ListingBodyGrid';

const View = (props) => {
  return (
    <ViewGrid
      {...props}
      render={(column, path, columns) => (
        <ListingBody data={column} path={path} columns={columns} />
      )}
    />
  );
};

export default View;
