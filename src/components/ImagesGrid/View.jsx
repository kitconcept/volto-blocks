import React from 'react';
import ViewGrid from '../Grid/View';
import ImageBody from './ImageBody';

const View = (props) => {
  return (
    <ViewGrid
      {...props}
      render={(column) => (
        <ImageBody
          data={column}
          dataGrid={props.data} // This allows to access the full data from the items
        />
      )}
    />
  );
};

export default View;
