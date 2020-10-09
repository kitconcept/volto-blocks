import React from 'react';
import ViewGrid from '../Grid/View';
import TeaserBody from './TeaserBody';

const View = (props) => {
  return (
    <ViewGrid {...props} render={(column) => <TeaserBody data={column} />} />
  );
};

export default View;
