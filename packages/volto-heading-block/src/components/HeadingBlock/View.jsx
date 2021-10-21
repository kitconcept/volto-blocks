import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';

const HeadingView = (props) => {
  const { data } = props;
  return (
    <>
      {data && (
        <div className="block heading">
          <div className="heading-wrapper">
            <h2 className="heading">{data?.title}</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default withBlockExtensions(HeadingView);
