import React from 'react';
import ViewGrid from '../Grid/View';
import ListingBody from './ListingBodyGrid';
import SimpleComp from './SimpleComp';

const View = (props) => {
  return (
    <ViewGrid
      {...props}
      render={(column, path, columns) => (
        <SimpleComp data={column} columns={columns} />
      )}
    />
  );
};

export default View;
