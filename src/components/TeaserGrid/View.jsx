import React from 'react';
import {
  GridViewBlock as ViewGrid,
  TeaserBody,
} from '@kitconcept/volto-blocks/components';

const View = (props) => {
  return (
    <ViewGrid {...props} render={(column) => <TeaserBody data={column} />} />
  );
};

export default View;
