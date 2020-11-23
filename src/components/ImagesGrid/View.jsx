import React from 'react';
import ViewGrid from '../Grid/View';
import ImageBody from './ImageBody';

const View = (props) => {
  return (
    <ViewGrid {...props} render={(column) => <ImageBody data={column} />} />
  );
};

export default View;
