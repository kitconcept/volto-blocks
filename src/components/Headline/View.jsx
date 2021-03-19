import React from 'react';

const View = (props) => {
  const { data } = props;
  return (
    <>
      {data && (
        <div className="block headline">
          <div className="wrapper">
            <div className="headline-wrapper">
              <h2>{data?.title}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default View;
