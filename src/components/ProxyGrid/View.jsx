import React from 'react';
import ViewGrid from '../Grid/View';

const View = props => {
  return <ViewGrid {...props} gridType="proxy" />;
};

export default View;
