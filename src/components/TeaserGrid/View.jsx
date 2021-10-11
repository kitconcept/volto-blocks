import React from 'react';
import {
  GridViewBlock as ViewGrid,
  TeaserBody,
} from '@kitconcept/volto-blocks/components';

const View = (props) => {
  return (
    <ViewGrid
      {...props}
      render={(column) => <TeaserBody data={column} dataBlock={props.data} />}
    />
  );
};

export default View;
